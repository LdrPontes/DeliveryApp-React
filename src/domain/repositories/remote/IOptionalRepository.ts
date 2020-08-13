import { Optional } from "../../entities/Optional";

export interface IOptionalRepository {
    save(name: string,
        enterprise_id: number,
        section_id: number,
        price: number,
    ): Promise<Optional>

    delete(id: number): Promise<boolean>

    update(id: number,
        name: string,
        price: number): Promise<Optional>
}