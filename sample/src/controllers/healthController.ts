import { IController, controller, get } from 'napi-server';

@controller('/health')
export class HealthController implements IController {
    
    @get()
    async getHealth() {
        return {
            status: 'ok'
        }
    }
}