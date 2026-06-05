<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function index()
    {
        return User::all();
    }
    
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(401);
        }
        
        $user = Auth::user();

        $user->tokens()->delete();

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('access_token')->plainTextToken,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json();
    }
    
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'contact' => 'required|string|min:6|max:20|unique:users,contact',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        return User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'contact' => $request->contact,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json()
            : response()->json(400);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset($request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->update([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ]);
                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json()
            : response()->json(422);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'email' => ['required','email',Rule::unique('users')->ignore($user->id)],
            'contact' => ['required','string','min:6','max:20',Rule::unique('users')->ignore($user->id)],
        ]);

        $user->update($request->only(['first_name','last_name','email','contact']));

        return response()->json(['user' => $user->refresh()]);
    }

    public function changePassword(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'current_password' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(422);
        }

        $user->update(['password' => Hash::make($request->password),]);

        return response()->json(['user' => $user->refresh()]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}