export interface EnterpriseSettings {
    delivery_settings: DeliverySettings;
    enterprise_settings: EnterpriseSettingsClass;
}

export interface DeliverySettings {
    min_price: number;
    free_delivery_above: number;
    free_delivery_above_enabled: boolean;
    delivery_fee_type: number;
    delivery_fee: number;
    delivery_time_start: number;
    delivery_time_end: number;
}

export interface EnterpriseSettingsClass {
    daily_works: DailyWork[];
    ask_cpf: boolean;
    observation_enabled: boolean;
    accept_money: boolean;
    accept_credit_card: boolean;
    accept_debit_card: boolean;
}

export class DailyWork {
    start_week_day: number;
    end_week_day: number;
    start_time: string;
    end_time: string;

    constructor(start_week_day: number,
        end_week_day: number,
        start_time: string,
        end_time: string,) {
        this.start_week_day = start_week_day
        this.end_week_day = end_week_day
        this.start_time = start_time
        this.end_time = end_time
    }
}
