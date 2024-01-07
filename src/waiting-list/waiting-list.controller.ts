import {Controller, Post, Req, Res} from '@nestjs/common';
import {WaitingListService} from "./waiting-list.service";

@Controller('waiting-list')
export class WaitingListController {
    constructor(public waitingListService: WaitingListService) {
    }
    @Post('/')
    async addToWaitingList(@Req() req, @Res() res) {
        try{
            const response = await this.waitingListService.addToWaitingList(req.body.email);
            console.log('here ', response)
            res.send({status: 'ok'});
        } catch (e) {
            res.status(400).send({status: 'error', message: 'Email already exists'});
        }
    }
}
