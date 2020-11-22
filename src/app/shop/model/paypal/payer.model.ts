export class ItemUnit {
  currency_code: string;
  value: string;
}

export class BreakDown {
  item_total: ItemUnit;
  shipping: ItemUnit;
}

export class Amount {
  currency_code: string;
  value: string;
  breakdown: BreakDown;
}

export class Item {
  name: string;
  quantity: string;
  category: string;
  unit_amount: ItemUnit;
}

export class Address {
  country_code: string;
  address_line_1: string;
  address_line_2: string;
  admin_area_1: string;
  admin_area_2?: string;
  postal_code: string;
}

export class Shipping {
  name: any = {
    full_name: ''
  };
  address: Address = new Address();
}

export class PurchaseUnit {
  amount: Amount;
  items: Item[] = [];
  shipping: Shipping = new Shipping();
  payments: Payments;
}

export class Order {
  // fields for database
  order_id: string;
  full_name: string;

  create_time: string;
  update_time: string;
  id: string;
  intent: string;
  status: string;
  payer: Payer;
  purchase_units: PurchaseUnit[];
}

export class Payments {
  captures: Capture[]
}

export class Capture {
  status: string;
  id: string;
  final_capture: boolean;
  create_time: string;
  update_time: string;
  amount: ItemUnit;
}

export class Payer {
  email_address: string;
  address: Address;
  phone: any = {
    phone_number: {
      national_number: ''
    }
  };
  payer_id: string;
  name: Name;
}

export class Name {
  given_name: string;
  surname: string;
}
