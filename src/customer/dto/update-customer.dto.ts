import { PartialType } from "@nestjs/mapped-types";
import { CreateCustomerDto } from "./create-customer.dto";

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    name?: string;
    lastName?: string;
    rfc?: string;
    email?: string;
    phone?: string;
    status?: boolean;
    addressId?: number;
}