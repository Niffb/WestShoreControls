import { Product } from '@/lib/types/shared-types';

import { Allenbradleyscrapedproducts } from './allen-bradley-scraped-products';
import { Generalelectriccables_accessoriesscrapedproducts } from './general-electric-cables_accessories-scraped-products';
import { Generalelectriccircuit_breakersscrapedproducts } from './general-electric-circuit_breakers-scraped-products';
import { Generalelectriccontactorsscrapedproducts } from './general-electric-contactors-scraped-products';
import { Generalelectricdrives_vfdsscrapedproducts } from './general-electric-drives_vfds-scraped-products';
import { Generalelectricmanual_motor_startersscrapedproducts } from './general-electric-manual_motor_starters-scraped-products';
import { Generalelectricother_productsscrapedproducts } from './general-electric-other_products-scraped-products';
import { Generalelectricoverload_relaysscrapedproducts } from './general-electric-overload_relays-scraped-products';
import { Generalelectricplcsscrapedproducts } from './general-electric-plcs-scraped-products';
import { Generalelectricpower_distributionscrapedproducts } from './general-electric-power_distribution-scraped-products';
import { Mitsubishibatteries_powerscrapedproducts } from './mitsubishi-batteries_power-scraped-products';
import { Mitsubishicables_accessoriesscrapedproducts } from './mitsubishi-cables_accessories-scraped-products';
import { Mitsubishicircuit_breakersscrapedproducts } from './mitsubishi-circuit_breakers-scraped-products';
import { Mitsubishidrives_vfdsscrapedproducts } from './mitsubishi-drives_vfds-scraped-products';
import { Mitsubishiother_productsscrapedproducts } from './mitsubishi-other_products-scraped-products';
import { Mitsubishiplcsscrapedproducts } from './mitsubishi-plcs-scraped-products';
import { Mitsubishipower_distributionscrapedproducts } from './mitsubishi-power_distribution-scraped-products';
import { Mitsubishiscrapedproducts } from './mitsubishi-scraped-products';
import { Mitsubishiservo_motorsscrapedproducts } from './mitsubishi-servo_motors-scraped-products';
import { Noarkcircuit_breakersscrapedproducts } from './noark-circuit_breakers-scraped-products';
import { Noarkcontactorsscrapedproducts } from './noark-contactors-scraped-products';
import { Noarkled_indicatorsscrapedproducts } from './noark-led_indicators-scraped-products';
import { Noarkmanual_motor_startersscrapedproducts } from './noark-manual_motor_starters-scraped-products';
import { Noarkother_productsscrapedproducts } from './noark-other_products-scraped-products';
import { Noarkoverload_relaysscrapedproducts } from './noark-overload_relays-scraped-products';
import { Noarkpower_distributionscrapedproducts } from './noark-power_distribution-scraped-products';
import { Noarkpush_buttonsscrapedproducts } from './noark-push_buttons-scraped-products';
import { Noarkscrapedproducts } from './noark-scraped-products';
import { Nventpower_distributionscrapedproducts } from './nvent-power_distribution-scraped-products';
import { Nventscrapedproducts } from './nvent-scraped-products';
import { Schneiderelectricscrapedproducts } from './schneider-electric-scraped-products';
import { Unknownbatteries_powerscrapedproducts } from './unknown-batteries_power-scraped-products';
import { Unknowncables_accessoriesscrapedproducts } from './unknown-cables_accessories-scraped-products';
import { Unknowncircuit_breakersscrapedproducts } from './unknown-circuit_breakers-scraped-products';
import { Unknowncontactorsscrapedproducts } from './unknown-contactors-scraped-products';
import { Unknowndrives_vfdsscrapedproducts } from './unknown-drives_vfds-scraped-products';
import { Unknownled_indicatorsscrapedproducts } from './unknown-led_indicators-scraped-products';
import { Unknownmanual_motor_startersscrapedproducts } from './unknown-manual_motor_starters-scraped-products';
import { Unknownother_productsscrapedproducts } from './unknown-other_products-scraped-products';
import { Unknownoverload_relaysscrapedproducts } from './unknown-overload_relays-scraped-products';
import { Unknownplcsscrapedproducts } from './unknown-plcs-scraped-products';
import { Unknownpower_distributionscrapedproducts } from './unknown-power_distribution-scraped-products';
import { Unknownscrapedproducts } from './unknown-scraped-products';

// All scraped products combined
export const allScrapedProducts: Product[] = [
  ...Allenbradleyscrapedproducts,
  ...Generalelectriccables_accessoriesscrapedproducts,
  ...Generalelectriccircuit_breakersscrapedproducts,
  ...Generalelectriccontactorsscrapedproducts,
  ...Generalelectricdrives_vfdsscrapedproducts,
  ...Generalelectricmanual_motor_startersscrapedproducts,
  ...Generalelectricother_productsscrapedproducts,
  ...Generalelectricoverload_relaysscrapedproducts,
  ...Generalelectricplcsscrapedproducts,
  ...Generalelectricpower_distributionscrapedproducts,
  ...Mitsubishibatteries_powerscrapedproducts,
  ...Mitsubishicables_accessoriesscrapedproducts,
  ...Mitsubishicircuit_breakersscrapedproducts,
  ...Mitsubishidrives_vfdsscrapedproducts,
  ...Mitsubishiother_productsscrapedproducts,
  ...Mitsubishiplcsscrapedproducts,
  ...Mitsubishipower_distributionscrapedproducts,
  ...Mitsubishiscrapedproducts,
  ...Mitsubishiservo_motorsscrapedproducts,
  ...Noarkcircuit_breakersscrapedproducts,
  ...Noarkcontactorsscrapedproducts,
  ...Noarkled_indicatorsscrapedproducts,
  ...Noarkmanual_motor_startersscrapedproducts,
  ...Noarkother_productsscrapedproducts,
  ...Noarkoverload_relaysscrapedproducts,
  ...Noarkpower_distributionscrapedproducts,
  ...Noarkpush_buttonsscrapedproducts,
  ...Noarkscrapedproducts,
  ...Nventpower_distributionscrapedproducts,
  ...Nventscrapedproducts,
  ...Schneiderelectricscrapedproducts,
  ...Unknownbatteries_powerscrapedproducts,
  ...Unknowncables_accessoriesscrapedproducts,
  ...Unknowncircuit_breakersscrapedproducts,
  ...Unknowncontactorsscrapedproducts,
  ...Unknowndrives_vfdsscrapedproducts,
  ...Unknownled_indicatorsscrapedproducts,
  ...Unknownmanual_motor_startersscrapedproducts,
  ...Unknownother_productsscrapedproducts,
  ...Unknownoverload_relaysscrapedproducts,
  ...Unknownplcsscrapedproducts,
  ...Unknownpower_distributionscrapedproducts,
  ...Unknownscrapedproducts
];
