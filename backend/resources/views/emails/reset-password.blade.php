<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Password — UndangTeman.id</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',Arial,sans-serif;background:#F7F4F1;color:#2C2C2C;padding:24px 16px}
    .wrap{max-width:560px;margin:0 auto}
    .card{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(28,43,74,.10)}
    .header{background:linear-gradient(135deg,#2D3F6B 0%,#3D3060 100%);padding:36px 32px;text-align:center}
    .header-icon{font-size:36px;margin-bottom:8px}
    .header h1{color:#fff;font-size:22px;font-weight:600}
    .header p{color:rgba(255,255,255,.7);font-size:13px;margin-top:4px}
    .body{padding:32px}
    .greeting{font-size:17px;font-weight:600;color:#1C2B4A;margin-bottom:12px}
    .text{font-size:14px;color:#555;line-height:1.7;margin-bottom:20px}
    .cred-box{background:#F7F4F1;border:1.5px solid #E0D9D2;border-radius:12px;padding:20px 24px;margin-bottom:24px}
    .cred-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #E0D9D2}
    .cred-row:last-child{border-bottom:none}
    .cred-label{font-size:12px;color:#7A7A7A;text-transform:uppercase;letter-spacing:.06em}
    .cred-value{font-size:14px;font-weight:600;color:#1C2B4A}
    .btn{display:block;background:#C8956C;color:#fff;text-decoration:none;text-align:center;padding:14px 24px;border-radius:50px;font-size:15px;font-weight:600;margin:0 auto 24px;max-width:220px}
    .warning{background:#FFF8F0;border-left:4px solid #C8956C;padding:12px 16px;border-radius:0 8px 8px 0;font-size:13px;color:#7A4F1E;margin-bottom:24px}
    .footer{text-align:center;padding:20px 32px;background:#F7F4F1;border-top:1px solid #E0D9D2}
    .footer p{font-size:12px;color:#7A7A7A;line-height:1.6}
    .footer strong{color:#1C2B4A}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="header">
        <div class="header-icon">🔑</div>
        <h1>UndangTeman.id</h1>
        <p>Reset Password</p>
      </div>
      <div class="body">
        <p class="greeting">Halo, {{ $user->full_name }}</p>
        <p class="text">
          Password Anda telah berhasil direset. Gunakan informasi di bawah untuk login:
        </p>

        <div class="cred-box">
          <div class="cred-row">
            <span class="cred-label">Email</span>
            <span class="cred-value">{{ $user->email }}</span>
          </div>
          <div class="cred-row">
            <span class="cred-label">Password Baru</span>
            <span class="cred-value">{{ $newPassword }}</span>
          </div>
        </div>

        <a href="{{ env('FRONTEND_URL', 'http://localhost:5173') }}/login" class="btn">
          Login Sekarang →
        </a>

        <div class="warning">
          🔒 Demi keamanan, segera ubah password Anda setelah berhasil login.
        </div>

        <p class="text">
          Jika Anda tidak meminta reset password, abaikan email ini dan segera
          hubungi tim kami.
        </p>
      </div>
      <div class="footer">
        <p><strong>UndangTeman.id</strong></p>
        <p>Portal Undangan Digital · Sekali bayar, aktif selamanya</p>
      </div>
    </div>
  </div>
</body>
</html>
