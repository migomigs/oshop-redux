import {defineAbility} from '@casl/ability';
import { AnonymousSubject } from 'rxjs/internal/Subject';

export default defineAbility ((can, cannot) => {
    can('manage', 'all');
    cannot('delete', 'User')
});