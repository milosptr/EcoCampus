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
  return 50 // Fixed 50 points per action
}

/**
 * Helper function to convert points to CO2 saved (kg)
 */
export const pointsToCo2 = (points: number): number => {
  return Math.round((points / CO2_TO_POINTS_RATIO) * 10) / 10
}

/**
 * Available actions for users to complete
 */
export const AVAILABLE_ACTIONS = [
  {
    id: 'lights',
    title: 'Turning lights off',
    kgSaved: ACTION_CO2_VALUES.LIGHTS_OFF_PER_HOUR,
    category: 'Energy',
  },
  {
    id: 'walk',
    title: 'Walking to school',
    kgSaved: ACTION_CO2_VALUES.WALK_PER_KM,
    category: 'Transport',
  },
  {
    id: 'shower',
    title: 'Shorter showers',
    kgSaved: 0.5,
    category: 'Water',
  },
  {
    id: 'vegetarian',
    title: 'Dish without red meat',
    kgSaved: 0.5,
    category: 'Food',
  },
  {
    id: 'secondhand',
    title: 'Buying secondhand',
    kgSaved: ACTION_CO2_VALUES.SECONDHAND_ITEM,
    category: 'Shopping',
  },
  {
    id: 'recycling',
    title: 'Recycling',
    kgSaved: ACTION_CO2_VALUES.RECYCLING_PER_WEEK / 7,
    category: 'Waste',
  },
  {
    id: 'device_off',
    title: 'Shutting off devices',
    kgSaved: ACTION_CO2_VALUES.DEVICE_OFF_PER_HOUR,
    category: 'Energy',
  },
  {
    id: 'reusable_cup',
    title: 'Reusable flask/cup',
    kgSaved: ACTION_CO2_VALUES.REUSABLE_CUP,
    category: 'Waste',
  },
]
