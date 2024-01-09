import {Controller, Post, Req, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../auth/auth.guard";
import {ContentService} from "./content.service";
import {UsersService} from "../users/users.service";

@Controller('content')
export class ContentController {
    constructor(private contentService: ContentService,
                private userService: UsersService) {

    }
    @UseGuards(AuthGuard)
    @Post('/')
    async createContent(@Req() req, @Res() res) {
        try{
            const content = await this.contentService.createContent(req.user, req.body.postTitle, req.body.postDescription);
            // convert to obj
            const contentObj = JSON.parse(content);
            res.send({content: contentObj});

            // const content = await this.contentService.createContent(req.user);
            // // Split the content into an array of lines
            // let lines = content.split('\n');
            // // Remove the first and last line
            // lines = lines.slice(1, -1);
            // // Join the remaining lines back into a single string
            // const modifiedContent = lines.join('\n');
            // this.contentService.mailContent(modifiedContent, await this.userService.getUser(req.user.email))
            //     .subscribe({next: (response) => {
            //             res.send({status: 'ok'})
            //         }, error: (error) => {
            //             res.status(400).send({error: 'Something went wrong'});
            //         }});
        } catch (e) {
            // console.log(e);
            res.status(400).send({error: 'Something went wrong'});
        }
    }

}
