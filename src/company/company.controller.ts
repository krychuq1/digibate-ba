import {Controller, Get, Param, Req, Res} from '@nestjs/common';
import {CompanyService} from "./company.service";

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {
    }
    @Get('/scan/:url')
    async googleLogin(@Req() req, @Res() res, @Param('url') url: string) {
        const response = await this.companyService.scanWebsite(url);
        res.send({content: response});

    }

}

