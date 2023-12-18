terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

variable "CREDENTIALS" {
    type = string
}

variable "PROJECT" {
    type = string
}

variable "OPENAI_KEY" {
    type = string
}

variable "YAHOO_API" {
    type = string
}

provider "google" {
  credentials = file(var.CREDENTIALS)

  project = var.PROJECT
  region  = "asia-northeast1"
  zone    = "asia-northeast1-a"
}

resource "random_id" "default" {
  byte_length = 8
}

resource "google_storage_bucket" "default" {
  name                        = "${random_id.default.hex}-gcf-source"
  location                    = "ASIA"
  uniform_bucket_level_access = true
}

data "archive_file" "default" {
  type        = "zip"
  output_path = "../backend/function-source.zip"
  source_dir  = "../backend"
}

resource "google_storage_bucket_object" "object" {
  name   = "function-source.zip"
  bucket = google_storage_bucket.default.name
  source = data.archive_file.default.output_path
}

resource "google_cloudfunctions2_function" "default" {
  name        = "gin-server"
  location    = "asia-northeast1"
  description = "Gin backend server"

  build_config {
    runtime     = "go121"
    entry_point = "HelloHTTP"
    source {
      storage_source {
        bucket = google_storage_bucket.default.name
        object = google_storage_bucket_object.object.name
      }
    }
  }

  service_config {
    max_instance_count = 1
    available_memory   = "256M"
    timeout_seconds    = 60
    environment_variables = {
      OPENAI_KEY = var.OPENAI_KEY
      YAHOO_API = var.YAHOO_API
    }
  }
}

resource "google_cloud_run_service_iam_member" "member" {
  location = google_cloudfunctions2_function.default.location
  service  = google_cloudfunctions2_function.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "function_uri" {
  value = google_cloudfunctions2_function.default.service_config[0].uri
}

resource "google_cloud_run_v2_service" "default" {
  name = "voicevox"
  location = "asia-northeast1"

  template {
    containers {
      ports {
        container_port = 50021
      }
      image = "voicevox/voicevox_engine:cpu-ubuntu20.04-latest"
      command = ["gosu", "user", "/opt/python/bin/python3", "./run.py", "--voicelib_dir",
                 "/opt/voicevox_core/", "--runtime_dir", "/opt/onnxruntime/lib", "--host", "0.0.0.0",
                 "--cors_policy_mode", "all"]
      args = []
      resources {
        limits = {
          cpu    = "1"
          memory = "2Gi"
        }
      }
    }
    max_instance_request_concurrency = 50
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_v2_service.default.location
  project     = google_cloud_run_v2_service.default.project
  service     = google_cloud_run_v2_service.default.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

output "cloud_run_uri" {
  value = google_cloud_run_v2_service.default.uri
}
