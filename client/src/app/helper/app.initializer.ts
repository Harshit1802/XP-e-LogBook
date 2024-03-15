
import { catchError, finalize, of } from 'rxjs';
import { LoginService } from '../services/login.service';

export function appInitializer(loginService: LoginService) {
    return () => loginService.refreshToken()
        .pipe(
            // catch error to start app on success or failure
            catchError(() => of())
        );
}