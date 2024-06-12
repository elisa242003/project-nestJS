import { PartialType } from "@nestjs/mapped-types";
import { CreateAddressDto } from "./create-address.dto";

export class UpdateAddressDto extends PartialType(CreateAddressDto){
    street?: string;
    townId?: number;
    exteriorNum?: string;
    interiorNum?: string;
    postalCode?: string;
}