<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    /** @var User */
    public $user;

    /** @var string */
    public $newPassword;

    public function __construct(User $user, string $newPassword)
    {
        $this->user        = $user;
        $this->newPassword = $newPassword;
    }

    public function build()
    {
        return $this
            ->subject('Reset Password — UndangTeman.id Portal Undangan Digital')
            ->view('emails.reset-password');
    }
}
