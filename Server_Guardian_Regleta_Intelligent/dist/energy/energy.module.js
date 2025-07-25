"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyModule = void 0;
const common_1 = require("@nestjs/common");
const energy_service_1 = require("./energy.service");
const energy_controller_1 = require("./energy.controller");
const typeorm_1 = require("@nestjs/typeorm");
const overload_entity_1 = require("./overload.entity");
let EnergyModule = class EnergyModule {
};
exports.EnergyModule = EnergyModule;
exports.EnergyModule = EnergyModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([overload_entity_1.OverloadEntity])],
        providers: [energy_service_1.EnergyService],
        controllers: [energy_controller_1.EnergyController],
    })
], EnergyModule);
//# sourceMappingURL=energy.module.js.map