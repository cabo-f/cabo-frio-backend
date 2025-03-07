import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movement } from 'src/movements/entities/movement.entity';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<Movement>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}
  async createIncome(createOrderDto: CreateOrderDto) {
    const { local, totalPrice, paymentMethod, createdAt } = createOrderDto;
    if (!local || !totalPrice || !paymentMethod || !createdAt) {
      throw new UnauthorizedException('Missing required fields');
    }
    const newOrder = await this.orderModel.create(createOrderDto);
    const newMovement = await this.movementModel.create({
      type: 'income',
      amount: totalPrice,
      local,
      paymentMethod,
      createdAt,
    });
    return { message: 'Order created', order: newOrder, movement: newMovement };
  }

  async findAll() {
    return await this.orderModel.find();
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
