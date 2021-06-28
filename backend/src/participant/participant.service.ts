import { Injectable } from '@nestjs/common';

// mongoose 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Participant, ParticipantDocument } from './schema/participant.schema';

// dto

import { CreateParticipantDTO } from './dto/create-participant-dto';

@Injectable()
export class ParticipantService {

    constructor(@InjectModel(Participant.name) private participantModel : Model <ParticipantDocument> ) { }


    async createParticipant( participant: CreateParticipantDTO ): Promise <Participant> {
        const new_participant = new this.participantModel( participant );
        return await new_participant.save();
    }

    async getAllParticipants( payments : string [] ) : Promise <Participant[]> {
        const participants = await this.participantModel.find({ payment_id : { $in: payments } });
        return participants;
    }

    async getAllParticipantsByPaymentId( payment_id : string ) : Promise <Participant[]> {
        const participants = await this.participantModel.find({ payment_id });
        return participants;
    }

    async updateAllDebts( payment_id: string, amount : number, participant_id : string ) : Promise<Participant[]> {
        await this.participantModel.updateMany({ _id: { $ne: participant_id }, payment_id}, { $inc: { owe : -amount } } );
        return await this.participantModel.find();
    }

}
