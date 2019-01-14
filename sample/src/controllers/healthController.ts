import { inject } from 'inversify';
import { IController, controller, get } from 'napi-server';

@controller('/health')
export class HealthController implements IController {
    @inject('text') private text: string = 'class string';

    @get()
    getHealth = async () => {
        console.log('hello');
        return {
            classString: this.text,
            status: 'ok'
        }
    }

    @get('/foo')
    async quickTest() {
        return {
            it: 'works'
        }
    }
}