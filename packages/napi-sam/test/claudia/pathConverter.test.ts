import 'mocha';
import {
    expect
} from 'chai';
import { napiPathToClaudia, claudiaPathToNapi } from '../../src/claudia/helpers/pathConverter';

describe('pathConverter', () => {
    it('should rewrite paths with path variables to claudia', () => {
        const response = napiPathToClaudia('/sample/:id');
        expect(response).to.equal('/sample/{id}');
    });

    it('should rewrite paths with path variables to napi', () => {
        const response = claudiaPathToNapi('/sample/{id}');
        expect(response).to.equal('/sample/:id');
    });
});