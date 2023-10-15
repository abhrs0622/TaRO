import { configureStore } from "@reduxjs/toolkit";
import latitudeReducer from "./features/latitude/latitudeSlice";
import longitudeReducer from "./features/longitude/longitudeSlice";
import plansReducer from "./features/plans/plansSlice";
import selectedPlanReducer from "./features/selectedPlan/selectedPlanSlice";
import coordinateReducer from "./features/coordinate/coordinateSlice";

export default configureStore({
  reducer: {
    latitude: latitudeReducer,
    longitude: longitudeReducer,
    plans: plansReducer,
    selectedPlan: selectedPlanReducer,
    coordinate: coordinateReducer,
  },
});
