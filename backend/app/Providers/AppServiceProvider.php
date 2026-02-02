<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function ($user, string $token) {

                if (!$user || !$user->email) {
                    return '';
                }

                $frontendUrl = config('app.frontend_url');

                if (!$frontendUrl) {
                    $frontendUrl = 'http://localhost:5173';
                }

                return $frontendUrl . '/reset-password'
                    . '?token=' . urlencode($token)
                    . '&email=' . urlencode($user->email);
        });
    }
}
