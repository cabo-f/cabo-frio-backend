import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movement } from './entities/movement.entity';
import { Model } from 'mongoose';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<Movement>,
  ) {}
  async create(createMovementDto: CreateMovementDto) {
    const { local, amount, type, paymentMethod, createdAt } = createMovementDto;
    if (!local || !amount || !type || !paymentMethod || !createdAt) {
      throw new UnauthorizedException('All fields are required');
    }
    const movement = await this.movementModel.create(createMovementDto);
    return { message: 'Movement created successfully', movement };
  }

  async findAll() {
    return await this.movementModel.find();
  }

  async filter(filter: object) {
    return await this.movementModel.find(filter);
  }

  async findOne(id: string) {
    const movement = await this.movementModel.findById(id);
    if (!movement) {
      throw new NotFoundException('Movement not found');
    }
    return movement;
  }

  update(id: string, updateMovementDto: UpdateMovementDto) {
    return `This action updates a #${id} movement`;
  }

  remove(id: string) {
    return `This action removes a #${id} movement`;
  }
}
