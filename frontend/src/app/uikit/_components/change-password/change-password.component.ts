import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'; // percorso corretto
import { CryptoService } from '../../../services/crypto.service.ts.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  isVisible = false;
  isSubmitting = false;
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  @Input() isLoading: boolean = false; // Stato di caricamento iniziale dal genitore

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private cryptoService: CryptoService) {
    this.form = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      new_password_confirmation: ['', Validators.required]
    });
  }

  toggleForm(): void {
    this.isVisible = !this.isVisible;
    this.message = null;
    this.messageType = null;
    this.form.reset();
  }



  async submit(): Promise<void> {
    if (this.form.invalid) return;

    const { old_password, new_password, new_password_confirmation } = this.form.value;
    if (new_password !== new_password_confirmation) {
      this.showMessage('Le nuove password non coincidono.', 'error');
      return;
    }

    this.isSubmitting = true;

    try {
      const user = await firstValueFrom(this.authService.getUser());

      const tasksResponse: any[] = (await firstValueFrom(this.authService.getUserTasks())) || [];

      if(environment.consolelog){console.log('Tasks received:', tasksResponse);}

      const decryptedTasks = await Promise.all(tasksResponse.map(async (task) => {
        const description = await this.cryptoService.decryptTask(task.description);
        return { id: task.id, description };
      }));

      await this.cryptoService.deriveKey(new_password, user.email);

      const encryptedTasks = await Promise.all(decryptedTasks.map(async (task) => {
        const description = await this.cryptoService.encryptTask(task.description);
        return { id: task.id, description };
      }));

      // Controllo che ci siano tasks prima di aggiornare
      if (encryptedTasks.length > 0) {
        await firstValueFrom(this.authService.updateAllTasks(encryptedTasks));
      }

      await firstValueFrom(this.authService.changePassword(this.form.value));

      this.showMessage('Password aggiornata con successo.', 'success');
      setTimeout(() => {
        this.toggleForm();
        this.isSubmitting = false;
      }, 2500);

    } catch (err) {
      console.error('Errore durante il cambio password:', err);
      this.showMessage('Errore durante il cambio password.', 'error');
      this.isSubmitting = false;
    }
  }



  private showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 2500);
  }
}