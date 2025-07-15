import { Product } from '@/lib/types/shared-types';

import { allenbradleyScrapedProducts } from './allen-bradley-scraped-products';
import { generalelectricCables_accessoriesScrapedProducts } from './general-electric-cables_accessories-scraped-products';
import { generalelectricCircuit_breakersScrapedProducts } from './general-electric-circuit_breakers-scraped-products';
import { generalelectricContactorsScrapedProducts } from './general-electric-contactors-scraped-products';
import { generalelectricDrives_vfdsScrapedProducts } from './general-electric-drives_vfds-scraped-products';
import { generalelectricManual_motor_startersScrapedProducts } from './general-electric-manual_motor_starters-scraped-products';
import { generalelectricOther_productsScrapedProducts } from './general-electric-other_products-scraped-products';
import { generalelectricOverload_relaysScrapedProducts } from './general-electric-overload_relays-scraped-products';
import { generalelectricPlcsScrapedProducts } from './general-electric-plcs-scraped-products';
import { generalelectricPower_distributionScrapedProducts } from './general-electric-power_distribution-scraped-products';
import { mitsubishiBatteries_powerScrapedProducts } from './mitsubishi-batteries_power-scraped-products';
import { mitsubishiCables_accessoriesScrapedProducts } from './mitsubishi-cables_accessories-scraped-products';
import { mitsubishiCircuit_breakersScrapedProducts } from './mitsubishi-circuit_breakers-scraped-products';
import { mitsubishiDrives_vfdsScrapedProducts } from './mitsubishi-drives_vfds-scraped-products';
import { mitsubishiOther_productsScrapedProducts } from './mitsubishi-other_products-scraped-products';
import { mitsubishiPlcsScrapedProducts } from './mitsubishi-plcs-scraped-products';
import { mitsubishiPower_distributionScrapedProducts } from './mitsubishi-power_distribution-scraped-products';
import { mitsubishiScrapedProducts } from './mitsubishi-scraped-products';
import { mitsubishiServo_motorsScrapedProducts } from './mitsubishi-servo_motors-scraped-products';
import { noarkCircuit_breakersScrapedProducts } from './noark-circuit_breakers-scraped-products';
import { noarkContactorsScrapedProducts } from './noark-contactors-scraped-products';
import { noarkLed_indicatorsScrapedProducts } from './noark-led_indicators-scraped-products';
import { noarkManual_motor_startersScrapedProducts } from './noark-manual_motor_starters-scraped-products';
import { noarkOther_productsScrapedProducts } from './noark-other_products-scraped-products';
import { noarkOverload_relaysScrapedProducts } from './noark-overload_relays-scraped-products';
import { noarkPower_distributionScrapedProducts } from './noark-power_distribution-scraped-products';
import { noarkPush_buttonsScrapedProducts } from './noark-push_buttons-scraped-products';
import { noarkScrapedProducts } from './noark-scraped-products';
import { nventPower_distributionScrapedProducts } from './nvent-power_distribution-scraped-products';
import { nventScrapedProducts } from './nvent-scraped-products';
import { schneiderelectricScrapedProducts } from './schneider-electric-scraped-products';
import { unknownBatteries_powerScrapedProducts } from './unknown-batteries_power-scraped-products';
import { unknownCables_accessoriesScrapedProducts } from './unknown-cables_accessories-scraped-products';
import { unknownCircuit_breakersScrapedProducts } from './unknown-circuit_breakers-scraped-products';
import { unknownContactorsScrapedProducts } from './unknown-contactors-scraped-products';
import { unknownDrives_vfdsScrapedProducts } from './unknown-drives_vfds-scraped-products';
import { unknownLed_indicatorsScrapedProducts } from './unknown-led_indicators-scraped-products';
import { unknownManual_motor_startersScrapedProducts } from './unknown-manual_motor_starters-scraped-products';
import { unknownOther_productsScrapedProducts } from './unknown-other_products-scraped-products';
import { unknownOverload_relaysScrapedProducts } from './unknown-overload_relays-scraped-products';
import { unknownPlcsScrapedProducts } from './unknown-plcs-scraped-products';
import { unknownPower_distributionScrapedProducts } from './unknown-power_distribution-scraped-products';
import { unknownScrapedProducts } from './unknown-scraped-products';

// All scraped products combined
export const allScrapedProducts: Product[] = [
  ...allenbradleyScrapedProducts,
  ...generalelectricCables_accessoriesScrapedProducts,
  ...generalelectricCircuit_breakersScrapedProducts,
  ...generalelectricContactorsScrapedProducts,
  ...generalelectricDrives_vfdsScrapedProducts,
  ...generalelectricManual_motor_startersScrapedProducts,
  ...generalelectricOther_productsScrapedProducts,
  ...generalelectricOverload_relaysScrapedProducts,
  ...generalelectricPlcsScrapedProducts,
  ...generalelectricPower_distributionScrapedProducts,
  ...mitsubishiBatteries_powerScrapedProducts,
  ...mitsubishiCables_accessoriesScrapedProducts,
  ...mitsubishiCircuit_breakersScrapedProducts,
  ...mitsubishiDrives_vfdsScrapedProducts,
  ...mitsubishiOther_productsScrapedProducts,
  ...mitsubishiPlcsScrapedProducts,
  ...mitsubishiPower_distributionScrapedProducts,
  ...mitsubishiScrapedProducts,
  ...mitsubishiServo_motorsScrapedProducts,
  ...noarkCircuit_breakersScrapedProducts,
  ...noarkContactorsScrapedProducts,
  ...noarkLed_indicatorsScrapedProducts,
  ...noarkManual_motor_startersScrapedProducts,
  ...noarkOther_productsScrapedProducts,
  ...noarkOverload_relaysScrapedProducts,
  ...noarkPower_distributionScrapedProducts,
  ...noarkPush_buttonsScrapedProducts,
  ...noarkScrapedProducts,
  ...nventPower_distributionScrapedProducts,
  ...nventScrapedProducts,
  ...schneiderelectricScrapedProducts,
  ...unknownBatteries_powerScrapedProducts,
  ...unknownCables_accessoriesScrapedProducts,
  ...unknownCircuit_breakersScrapedProducts,
  ...unknownContactorsScrapedProducts,
  ...unknownDrives_vfdsScrapedProducts,
  ...unknownLed_indicatorsScrapedProducts,
  ...unknownManual_motor_startersScrapedProducts,
  ...unknownOther_productsScrapedProducts,
  ...unknownOverload_relaysScrapedProducts,
  ...unknownPlcsScrapedProducts,
  ...unknownPower_distributionScrapedProducts,
  ...unknownScrapedProducts
];
