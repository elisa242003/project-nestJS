export class CreateCustomerDto {
    name: string;
    lastName: string;
    rfc: string;
    addressId: number;
    email: string;
    phone: string;
    status: boolean = true;
}