import { User } from "./user";

export class Biker extends User {
    public birthdate: Date;
    public areaId: number;
    public licence: number;
    public ratings: any[];
}