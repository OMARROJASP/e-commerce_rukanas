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
exports.OrderDetailEntity = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const product_entity_1 = require("./product.entity");
let OrderDetailEntity = class OrderDetailEntity {
};
exports.OrderDetailEntity = OrderDetailEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderDetailEntity.prototype, "ord_det_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderDetailEntity.prototype, "ord_det_order_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.OrderEntity, order => order.orderDetails, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "ord_det_order_id" }),
    __metadata("design:type", order_entity_1.OrderEntity)
], OrderDetailEntity.prototype, "ord_det_order", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderDetailEntity.prototype, "ord_det_product_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, product => product.prod_id),
    (0, typeorm_1.JoinColumn)({ name: "ord_det_product_id" }),
    __metadata("design:type", product_entity_1.ProductEntity)
], OrderDetailEntity.prototype, "ord_det_product", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderDetailEntity.prototype, "ord_det_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderDetailEntity.prototype, "ord_det_unit_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], OrderDetailEntity.prototype, "ord_det_discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderDetailEntity.prototype, "ord_det_subtotal", void 0);
exports.OrderDetailEntity = OrderDetailEntity = __decorate([
    (0, typeorm_1.Entity)('order_details')
], OrderDetailEntity);
