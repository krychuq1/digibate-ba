import {Controller, Get, Param, Post, Req, Res, UseGuards} from '@nestjs/common';
import {CompanyService} from "./company.service";
import {AuthGuard} from "../auth/auth.guard";

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {
    }
    @Get('/scan/:url')
    async googleLogin(@Req() req, @Res() res, @Param('url') url: string) {
        try{
            // const response = await this.companyService.scanWebsite(url);
            const response = await this.companyService.scanTest(url);
            res.send({content: response});

        } catch (e) {
            res.status(400).send({error: 'Something went wrong'});
        }
    }
    @UseGuards(AuthGuard)
    @Post('/')
    async addCompany(@Req() req, @Res() res) {
        try{
            await this.companyService.addCompany(req.body.company, req.user.email);
            res.send({status: 'ok'})
        } catch (e) {
            console.log(e);
            res.status(400).send({error: 'Something went wrong'});
        }

    }

}

