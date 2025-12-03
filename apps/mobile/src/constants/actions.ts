/**
 * CO2 emissions saved per action based on research data
 * All values in kg CO2
 */
export const ACTION_CO2_VALUES = {
  // Transport (per km)
  BIKE_PER_KM: 0.16,
  WALK_PER_KM: 0.16,

  // Food
  VEGETARIAN_DISH: 2,

  // Energy (per hour)
  LIGHTS_OFF_PER_HOUR: 0.004,
  DEVICE_OFF_PER_HOUR: 0.003,

  // Shopping (conservative minimum values)
  SECONDHAND_ITEM: 3,
  LOCAL_PURCHASE: 0.1,

  // Daily actions
  REUSABLE_CUP: 0.11,
  SHOWER_PER_MIN: 0.5,

  // Waste
  RECYCLING_PER_WEEK: 2.8,
} as const

/**
 * Conversion rate: 1 kg CO2 saved = 100 points
 * This keeps points meaningful while being based on actual environmental impact
 */
export const CO2_TO_POINTS_RATIO = 100

/**
 * Helper function to convert CO2 saved (kg) to points
 */
export const co2ToPoints = (co2Kg: number): number => {
  return Math.round(co2Kg * CO2_TO_POINTS_RATIO)
}

/**
 * Helper function to convert points to CO2 saved (kg)
 */
export const pointsToCo2 = (points: number): number => {
  return Math.round((points / CO2_TO_POINTS_RATIO) * 10) / 10
}
