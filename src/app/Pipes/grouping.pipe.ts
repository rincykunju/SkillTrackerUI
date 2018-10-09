
import {Pipe, PipeTransform, Injectable} from '@angular/core';
// import { pipe } from 'rxjs/internal/util/pipe';

@Pipe({ name: 'grouping' })
@Injectable()
export class GrooupingPipe implements PipeTransform {
  transform(value:any) {
    return value.filter((v,i) => i%2==0).map((v,i) => [value[i*2], value[i*2+1]])
  }
}