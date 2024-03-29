import { Inject, Injectable } from '@nestjs/common';

import * as jwt from "jsonwebtoken"

import { CONFIG_OPTIONS } from './constants';
import { JwtModuleOptions } from './jwt.interface';

@Injectable()
export class JwtService {
    constructor(@Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions) {
    }

    sign(id: number): string {
        return jwt.sign({ id }, this.options.privateKey)
    }

    verify(token: string) {
        return jwt.verify(token, this.options.privateKey);
    }
}