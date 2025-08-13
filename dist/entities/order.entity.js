"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEntity = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
const orderDetail_entity_1 = require("./orderDetail.entity");
let OrderEntity = class OrderEntity {
};
exports.OrderEntity = OrderEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderEntity.prototype, "ord_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "ord_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'CREATED' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "ord_status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.CustomerEntity, customer => customer.orders),
    (0, typeorm_1.JoinColumn)({ name: "ord_customer" }) // Opcionalmente puedes especificar el nombre si quieres un FK claro
    ,
    __metadata("design:type", customer_entity_1.CustomerEntity)
], OrderEntity.prototype, "ord_customer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderDetail_entity_1.OrderDetailEntity, orderDetail => orderDetail.ord_det_order, { cascade: true }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "orderDetails", void 0);
exports.OrderEntity = OrderEntity = __decorate([
    (0, typeorm_1.Entity)('orders')
], OrderEntity);
