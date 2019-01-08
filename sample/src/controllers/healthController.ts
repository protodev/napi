import { IController, controller, get } from 'napi-server';

@controller('/health')
export class HealthController implements IController {
    @get()
    async getHealth() {
        console.log('hello');
        return {
            status: 'ok'
        }
    }
}