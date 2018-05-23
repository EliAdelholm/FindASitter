import { User } from "./user";

export class Biker extends User {
    public birthdate: string;
    public areaId: number;
    public licence: number;
    public ratings: any[];
    public bikes: any[];
}