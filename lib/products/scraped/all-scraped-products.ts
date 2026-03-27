import { Product } from '@/lib/types/shared-types';

// Import all scraped products from individual files
// import { allenbradleyScrapedProducts } from './allen-bradley-scraped-products'; // REMOVED - Allen Bradley PLCs
import { bannerpower_distributionScrapedProducts } from './banner-power-distribution-scraped-products';
import { brpower_distributionScrapedProducts } from './br-power-distribution-scraped-products';
import { contrinexoverload_relaysScrapedProducts } from './contrinex-overload-relays-scraped-products';
import { datalogiccircuit_breakersScrapedProducts } from './datalogic-circuit-breakers-scraped-products';
import { datalogicled_indicatorsScrapedProducts } from './datalogic-led-indicators-scraped-products';
import { datalogicother_productsScrapedProducts } from './datalogic-other-products-scraped-products';
import { datalogicpower_distributionScrapedProducts } from './datalogic-power-distribution-scraped-products';
// import { deltadrives_vfdsScrapedProducts } from './delta-drives-vfds-scraped-products'; // REMOVED - Delta VFDs
import { generalelectriccables_accessoriesScrapedProducts } from './general-electric-cables-accessories-scraped-products';
import { generalelectricCables_accessoriesScrapedProducts } from './general-electric-cables_accessories-scraped-products';
import { generalelectriccircuit_breakersScrapedProducts } from './general-electric-circuit-breakers-scraped-products';
import { generalelectricCircuit_breakersScrapedProducts } from './general-electric-circuit_breakers-scraped-products';
import { generalelectriccontactorsScrapedProducts } from './general-electric-contactors-scraped-products';
// import { generalelectricdrives_vfdsScrapedProducts } from './general-electric-drives-vfds-scraped-products'; // REMOVED - GE VFDs
// import { generalelectricDrives_vfdsScrapedProducts } from './general-electric-drives_vfds-scraped-products'; // REMOVED - GE VFDs
import { generalelectricmanual_motor_startersScrapedProducts } from './general-electric-manual-motor-starters-scraped-products';
import { generalelectricManual_motor_startersScrapedProducts } from './general-electric-manual_motor_starters-scraped-products';
import { generalelectricother_productsScrapedProducts } from './general-electric-other-products-scraped-products';
import { generalelectricOther_productsScrapedProducts } from './general-electric-other_products-scraped-products';
import { generalelectricoverload_relaysScrapedProducts } from './general-electric-overload-relays-scraped-products';
import { generalelectricOverload_relaysScrapedProducts } from './general-electric-overload_relays-scraped-products';
// import { generalelectricplcsScrapedProducts } from './general-electric-plcs-scraped-products'; // REMOVED - GE PLCs
import { generalelectricpower_distributionScrapedProducts } from './general-electric-power-distribution-scraped-products';
import { generalelectricPower_distributionScrapedProducts } from './general-electric-power_distribution-scraped-products';
import { hartingcircuit_breakersScrapedProducts } from './harting-circuit-breakers-scraped-products';
import { hartingcontactorsScrapedProducts } from './harting-contactors-scraped-products';
import { hartingother_productsScrapedProducts } from './harting-other-products-scraped-products';
import { hartingpower_distributionScrapedProducts } from './harting-power-distribution-scraped-products';
import { hoffmanplcsScrapedProducts } from './hoffman-plcs-scraped-products';
import { honeywellpower_distributionScrapedProducts } from './honeywell-power-distribution-scraped-products';
// REMOVED - Mitsubishi products now handled separately via mitsubishi-products-scraped.ts
// These files have ID collisions and incorrect images - use mitsubishiScrapedProducts instead
// import { mitsubishibatteries_powerScrapedProducts } from './mitsubishi-batteries-power-scraped-products';
// import { mitsubishiBatteries_powerScrapedProducts } from './mitsubishi-batteries_power-scraped-products';
// import { mitsubishicables_accessoriesScrapedProducts } from './mitsubishi-cables-accessories-scraped-products';
// import { mitsubishiCables_accessoriesScrapedProducts } from './mitsubishi-cables_accessories-scraped-products';
// import { mitsubishicircuit_breakersScrapedProducts } from './mitsubishi-circuit-breakers-scraped-products';
// import { mitsubishiCircuit_breakersScrapedProducts } from './mitsubishi-circuit_breakers-scraped-products';
// import { mitsubishicontactorsScrapedProducts } from './mitsubishi-contactors-scraped-products';
// import { mitsubishidrives_vfdsScrapedProducts } from './mitsubishi-drives-vfds-scraped-products';
// import { mitsubishiDrives_vfdsScrapedProducts } from './mitsubishi-drives_vfds-scraped-products';
// import { mitsubishiother_productsScrapedProducts } from './mitsubishi-other-products-scraped-products';
// import { mitsubishiOther_productsScrapedProducts } from './mitsubishi-other_products-scraped-products';
// import { mitsubishiplcsScrapedProducts } from './mitsubishi-plcs-scraped-products';
// import { mitsubishipower_distributionScrapedProducts } from './mitsubishi-power-distribution-scraped-products';
// import { mitsubishiPower_distributionScrapedProducts } from './mitsubishi-power_distribution-scraped-products';
// import { mitsubishiScrapedProducts } from './mitsubishi-scraped-products';
// import { mitsubishiservo_motorsScrapedProducts } from './mitsubishi-servo-motors-scraped-products';
// import { mitsubishiServo_motorsScrapedProducts } from './mitsubishi-servo_motors-scraped-products';
import { noarkcircuit_breakersScrapedProducts } from './noark-circuit-breakers-scraped-products';
import { noarkCircuit_breakersScrapedProducts } from './noark-circuit_breakers-scraped-products';
import { noarkcontactorsScrapedProducts } from './noark-contactors-scraped-products';
import { noarkled_indicatorsScrapedProducts } from './noark-led-indicators-scraped-products';
import { noarkLed_indicatorsScrapedProducts } from './noark-led_indicators-scraped-products';
import { noarkmanual_motor_startersScrapedProducts } from './noark-manual-motor-starters-scraped-products';
import { noarkManual_motor_startersScrapedProducts } from './noark-manual_motor_starters-scraped-products';
import { noarkother_productsScrapedProducts } from './noark-other-products-scraped-products';
import { noarkOther_productsScrapedProducts } from './noark-other_products-scraped-products';
import { noarkoverload_relaysScrapedProducts } from './noark-overload-relays-scraped-products';
import { noarkOverload_relaysScrapedProducts } from './noark-overload_relays-scraped-products';
import { noarkpower_distributionScrapedProducts } from './noark-power-distribution-scraped-products';
import { noarkPower_distributionScrapedProducts } from './noark-power_distribution-scraped-products';
import { noarkpush_buttonsScrapedProducts } from './noark-push-buttons-scraped-products';
import { noarkPush_buttonsScrapedProducts } from './noark-push_buttons-scraped-products';
import { noarkScrapedProducts } from './noark-scraped-products';
import { nventpower_distributionScrapedProducts } from './nvent-power-distribution-scraped-products';
import { nventPower_distributionScrapedProducts } from './nvent-power_distribution-scraped-products';
import { nventScrapedProducts } from './nvent-scraped-products';
import { phoenixcontactcontactorsScrapedProducts } from './phoenix-contact-contactors-scraped-products';
import { schneiderelectricScrapedProducts } from './schneider-electric-scraped-products';
import { stahlinother_productsScrapedProducts } from './stahlin-other-products-scraped-products';
import { teconnectivitydrives_vfdsScrapedProducts } from './te-connectivity-drives-vfds-scraped-products';
import { teconnectivityother_productsScrapedProducts } from './te-connectivity-other-products-scraped-products';
import { teconnectivitypower_distributionScrapedProducts } from './te-connectivity-power-distribution-scraped-products';
import { turckpower_distributionScrapedProducts } from './turck-power-distribution-scraped-products';
import { unknownbatteries_powerScrapedProducts } from './unknown-batteries-power-scraped-products';
import { unknownBatteries_powerScrapedProducts } from './unknown-batteries_power-scraped-products';
import { unknowncables_accessoriesScrapedProducts } from './unknown-cables-accessories-scraped-products';
import { unknownCables_accessoriesScrapedProducts } from './unknown-cables_accessories-scraped-products';
import { unknowncircuit_breakersScrapedProducts } from './unknown-circuit-breakers-scraped-products';
import { unknownCircuit_breakersScrapedProducts } from './unknown-circuit_breakers-scraped-products';
import { unknowncontactorsScrapedProducts } from './unknown-contactors-scraped-products';
import { unknowndrives_vfdsScrapedProducts } from './unknown-drives-vfds-scraped-products';
import { unknownDrives_vfdsScrapedProducts } from './unknown-drives_vfds-scraped-products';
import { unknownLed_indicatorsScrapedProducts } from './unknown-led_indicators-scraped-products';
import { unknownmanual_motor_startersScrapedProducts } from './unknown-manual-motor-starters-scraped-products';
import { unknownManual_motor_startersScrapedProducts } from './unknown-manual_motor_starters-scraped-products';
import { unknownother_productsScrapedProducts } from './unknown-other-products-scraped-products';
import { unknownOther_productsScrapedProducts } from './unknown-other_products-scraped-products';
import { unknownoverload_relaysScrapedProducts } from './unknown-overload-relays-scraped-products';
import { unknownOverload_relaysScrapedProducts } from './unknown-overload_relays-scraped-products';
import { unknownplcsScrapedProducts } from './unknown-plcs-scraped-products';
import { unknownpower_distributionScrapedProducts } from './unknown-power-distribution-scraped-products';
import { unknownPower_distributionScrapedProducts } from './unknown-power_distribution-scraped-products';
import { unknownScrapedProducts } from './unknown-scraped-products';

// All scraped products combined
// Total files: 94
// Generated automatically by scripts/generate-all-scraped-products.js
export const allScrapedProducts: Product[] = [
  // ...allenbradleyScrapedProducts, // REMOVED - Allen Bradley PLCs
  ...bannerpower_distributionScrapedProducts,
  ...brpower_distributionScrapedProducts,
  ...contrinexoverload_relaysScrapedProducts,
  ...datalogiccircuit_breakersScrapedProducts,
  ...datalogicled_indicatorsScrapedProducts,
  ...datalogicother_productsScrapedProducts,
  ...datalogicpower_distributionScrapedProducts,
  // ...deltadrives_vfdsScrapedProducts, // REMOVED - Delta VFDs
  ...generalelectriccables_accessoriesScrapedProducts,
  ...generalelectricCables_accessoriesScrapedProducts,
  ...generalelectriccircuit_breakersScrapedProducts,
  ...generalelectricCircuit_breakersScrapedProducts,
  ...generalelectriccontactorsScrapedProducts,
  // ...generalelectricdrives_vfdsScrapedProducts, // REMOVED - GE VFDs
  // ...generalelectricDrives_vfdsScrapedProducts, // REMOVED - GE VFDs
  ...generalelectricmanual_motor_startersScrapedProducts,
  ...generalelectricManual_motor_startersScrapedProducts,
  ...generalelectricother_productsScrapedProducts,
  ...generalelectricOther_productsScrapedProducts,
  ...generalelectricoverload_relaysScrapedProducts,
  ...generalelectricOverload_relaysScrapedProducts,
  // ...generalelectricplcsScrapedProducts, // REMOVED - GE PLCs
  ...generalelectricpower_distributionScrapedProducts,
  ...generalelectricPower_distributionScrapedProducts,
  ...hartingcircuit_breakersScrapedProducts,
  ...hartingcontactorsScrapedProducts,
  ...hartingother_productsScrapedProducts,
  ...hartingpower_distributionScrapedProducts,
  ...hoffmanplcsScrapedProducts,
  ...honeywellpower_distributionScrapedProducts,
  // REMOVED - Mitsubishi products now handled separately via mitsubishi-products-scraped.ts
  // ...mitsubishibatteries_powerScrapedProducts,
  // ...mitsubishiBatteries_powerScrapedProducts,
  // ...mitsubishicables_accessoriesScrapedProducts,
  // ...mitsubishiCables_accessoriesScrapedProducts,
  // ...mitsubishicircuit_breakersScrapedProducts,
  // ...mitsubishiCircuit_breakersScrapedProducts,
  // ...mitsubishicontactorsScrapedProducts,
  // ...mitsubishidrives_vfdsScrapedProducts,
  // ...mitsubishiDrives_vfdsScrapedProducts,
  // ...mitsubishiother_productsScrapedProducts,
  // ...mitsubishiOther_productsScrapedProducts,
  // ...mitsubishiplcsScrapedProducts,
  // ...mitsubishipower_distributionScrapedProducts,
  // ...mitsubishiPower_distributionScrapedProducts,
  // ...mitsubishiScrapedProducts,
  // ...mitsubishiservo_motorsScrapedProducts,
  // ...mitsubishiServo_motorsScrapedProducts,
  ...noarkcircuit_breakersScrapedProducts,
  ...noarkCircuit_breakersScrapedProducts,
  ...noarkcontactorsScrapedProducts,
  ...noarkled_indicatorsScrapedProducts,
  ...noarkLed_indicatorsScrapedProducts,
  ...noarkmanual_motor_startersScrapedProducts,
  ...noarkManual_motor_startersScrapedProducts,
  ...noarkother_productsScrapedProducts,
  ...noarkOther_productsScrapedProducts,
  ...noarkoverload_relaysScrapedProducts,
  ...noarkOverload_relaysScrapedProducts,
  ...noarkpower_distributionScrapedProducts,
  ...noarkPower_distributionScrapedProducts,
  ...noarkpush_buttonsScrapedProducts,
  ...noarkPush_buttonsScrapedProducts,
  ...noarkScrapedProducts,
  ...nventpower_distributionScrapedProducts,
  ...nventPower_distributionScrapedProducts,
  ...nventScrapedProducts,
  ...phoenixcontactcontactorsScrapedProducts,
  ...schneiderelectricScrapedProducts,
  ...stahlinother_productsScrapedProducts,
  ...teconnectivitydrives_vfdsScrapedProducts,
  ...teconnectivityother_productsScrapedProducts,
  ...teconnectivitypower_distributionScrapedProducts,
  ...turckpower_distributionScrapedProducts,
  ...unknownbatteries_powerScrapedProducts,
  ...unknownBatteries_powerScrapedProducts,
  ...unknowncables_accessoriesScrapedProducts,
  ...unknownCables_accessoriesScrapedProducts,
  ...unknowncircuit_breakersScrapedProducts,
  ...unknownCircuit_breakersScrapedProducts,
  ...unknowncontactorsScrapedProducts,
  ...unknowndrives_vfdsScrapedProducts,
  ...unknownDrives_vfdsScrapedProducts,
  ...unknownLed_indicatorsScrapedProducts,
  ...unknownmanual_motor_startersScrapedProducts,
  ...unknownManual_motor_startersScrapedProducts,
  ...unknownother_productsScrapedProducts,
  ...unknownOther_productsScrapedProducts,
  ...unknownoverload_relaysScrapedProducts,
  ...unknownOverload_relaysScrapedProducts,
  ...unknownplcsScrapedProducts,
  ...unknownpower_distributionScrapedProducts,
  ...unknownPower_distributionScrapedProducts,
  ...unknownScrapedProducts,
];

// Export count for debugging
export const scrapedProductsCount = allScrapedProducts.length;
