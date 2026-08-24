<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Template;

class TemplateSeeder extends Seeder
{
    public function run(): void
    {
        $editUrl = '/invitation/acfe56fa-8a30-4e64-a2bd-085d28eeef8c/edit';

        $templates = [
            /* ── ELEGANT ── */
            [
                'name' => 'Elegant Luxury', 'slug' => 'elegant-luxury',
                'description' => 'Kemewahan klasik dengan sentuhan emas dan hitam elegan.',
                'category' => 'elegant', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
                'theme_config' => ['primary'=>'#1C1C1C','secondary'=>'#C8A96E','accent'=>'#E8D5A0','bg'=>'#FAF8F5','text'=>'#1C1C1C','font_serif'=>'Cormorant Garamond','font_sans'=>'Inter','cover_style'=>'dark-overlay','ornament'=>'✦','layout'=>'classic','particles'=>'glitter','particle_color'=>'#C8A96E'],
            ],
            [
                'name' => 'White Gold', 'slug' => 'white-gold',
                'description' => 'Putih bersih berpadu emas lembut, timeless dan pure.',
                'category' => 'elegant', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80',
                'theme_config' => ['primary'=>'#2A2118','secondary'=>'#D4AF7A','accent'=>'#F0D9A8','bg'=>'#FFFEF9','text'=>'#2A2118','font_serif'=>'Playfair Display','font_sans'=>'Lato','cover_style'=>'light-overlay','ornament'=>'◇','layout'=>'classic','particles'=>'glitter','particle_color'=>'#D4AF7A'],
            ],
            [
                'name' => 'Royal Wedding', 'slug' => 'royal-wedding',
                'description' => 'Megah seperti pernikahan kerajaan, ungu dan emas.',
                'category' => 'elegant', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
                'theme_config' => ['primary'=>'#1A0A3A','secondary'=>'#9B59B6','accent'=>'#D4AF7A','bg'=>'#FAF7FF','text'=>'#1A0A3A','font_serif'=>'Cormorant Garamond','font_sans'=>'Raleway','cover_style'=>'dark-overlay','ornament'=>'♔','layout'=>'fullscreen','particles'=>'glitter','particle_color'=>'#D4AF7A'],
            ],
            [
                'name' => 'Minimalist Modern', 'slug' => 'minimalist-modern',
                'description' => 'Bersih, modern, tanpa ornamen berlebih.',
                'category' => 'elegant', 'has_photo' => false,
                'preview_image' => 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
                'theme_config' => ['primary'=>'#1A1A1A','secondary'=>'#555','accent'=>'#888','bg'=>'#FFFFFF','text'=>'#1A1A1A','font_serif'=>'EB Garamond','font_sans'=>'Inter','cover_style'=>'dark-overlay','ornament'=>'—','layout'=>'minimal','particles'=>'none','particle_color'=>'#888'],
            ],
            [
                'name' => 'Sandhya', 'slug' => 'sandhya',
                'description' => 'Navy elegan dengan rose gold, klasik dan timeless.',
                'category' => 'elegant', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
                'theme_config' => ['primary'=>'#1C2B4A','secondary'=>'#C8956C','accent'=>'#D4AF7A','bg'=>'#F7F3EE','text'=>'#2C2C2C','font_serif'=>'Cormorant Garamond','font_sans'=>'Inter','cover_style'=>'dark-overlay','ornament'=>'✦','layout'=>'classic','particles'=>'petals','particle_color'=>'#E4B48A'],
            ],

            /* ── IMMERSIVE / NATURE ── */
            [
                'name' => 'Classic Floral', 'slug' => 'classic-floral',
                'description' => 'Kelopak bunga melayang, romantis dan feminin.',
                'category' => 'immersive', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&q=80',
                'theme_config' => ['primary'=>'#5A2D3A','secondary'=>'#C8856C','accent'=>'#F0C4A8','bg'=>'#FDF6F0','text'=>'#3A1A22','font_serif'=>'Cormorant Garamond','font_sans'=>'Montserrat','cover_style'=>'light-overlay','ornament'=>'✿','layout'=>'classic','particles'=>'petals','particle_color'=>'#F4A8C0'],
            ],
            [
                'name' => 'Sakura', 'slug' => 'sakura',
                'description' => 'Bunga sakura berguguran, nuansa Jepang yang memukau.',
                'category' => 'immersive', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&q=80',
                'theme_config' => ['primary'=>'#5A2040','secondary'=>'#E8729A','accent'=>'#FFB7C5','bg'=>'#FFF5F8','text'=>'#3A0A28','font_serif'=>'Cormorant Garamond','font_sans'=>'Inter','cover_style'=>'light-overlay','ornament'=>'🌸','layout'=>'classic','particles'=>'sakura','particle_color'=>'#FFB7C5'],
            ],
            [
                'name' => 'Garden Wedding', 'slug' => 'garden-wedding',
                'description' => 'Taman hijau segar dengan kupu-kupu beterbangan.',
                'category' => 'immersive', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80',
                'theme_config' => ['primary'=>'#2A4A2A','secondary'=>'#6A9A5A','accent'=>'#A8D090','bg'=>'#F4FAF0','text'=>'#1A2A1A','font_serif'=>'Playfair Display','font_sans'=>'Nunito','cover_style'=>'light-overlay','ornament'=>'🌿','layout'=>'classic','particles'=>'leaves','particle_color'=>'#6A9A5A'],
            ],
            [
                'name' => 'Tropical Beach', 'slug' => 'tropical-beach',
                'description' => 'Pantai tropis dengan gelombang dan cahaya matahari.',
                'category' => 'immersive', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80',
                'theme_config' => ['primary'=>'#0A3A5A','secondary'=>'#2AB4D4','accent'=>'#70D4F0','bg'=>'#F0FBFF','text'=>'#0A1A2A','font_serif'=>'Cormorant Garamond','font_sans'=>'Poppins','cover_style'=>'dark-overlay','ornament'=>'🌊','layout'=>'fullscreen','particles'=>'bubbles','particle_color'=>'#70D4F0'],
            ],
            [
                'name' => 'Romantic Night', 'slug' => 'romantic-night',
                'description' => 'Malam penuh bintang dan cahaya, dramatis dan mewah.',
                'category' => 'immersive', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
                'theme_config' => ['primary'=>'#08041A','secondary'=>'#8060C0','accent'=>'#C0A0F0','bg'=>'#0C081E','text'=>'#E8E0F8','font_serif'=>'Cormorant Garamond','font_sans'=>'Inter','cover_style'=>'dark-overlay','ornament'=>'★','layout'=>'fullscreen','particles'=>'stars','particle_color'=>'#C0A0F0'],
            ],
            [
                'name' => 'Premium Dark', 'slug' => 'premium-dark',
                'description' => 'Hitam premium dengan kunang-kunang emas, mewah dan modern.',
                'category' => 'immersive', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1446244071668-0f0e5bb60d3c?w=800&q=80',
                'theme_config' => ['primary'=>'#080808','secondary'=>'#C8A06E','accent'=>'#E8C890','bg'=>'#0C0C0C','text'=>'#E8E4D8','font_serif'=>'Cormorant Garamond','font_sans'=>'Inter','cover_style'=>'dark-overlay','ornament'=>'✦','layout'=>'fullscreen','particles'=>'firefly','particle_color'=>'#E8C890'],
            ],

            /* ── SPESIAL / BUDAYA ── */
            [
                'name' => 'Bohemian', 'slug' => 'bohemian',
                'description' => 'Bebas dan artistik dengan nuansa earthy yang hangat.',
                'category' => 'spesial', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80',
                'theme_config' => ['primary'=>'#4A2A1A','secondary'=>'#C87040','accent'=>'#F0B080','bg'=>'#FAF0E0','text'=>'#2A1A0A','font_serif'=>'Cormorant Garamond','font_sans'=>'Nunito','cover_style'=>'pattern','ornament'=>'✧','layout'=>'cultural','particles'=>'petals','particle_color'=>'#F0B080'],
            ],
            [
                'name' => 'Korean Style', 'slug' => 'korean-style',
                'description' => 'Soft dan pastel ala K-drama, lembut dan estetik.',
                'category' => 'spesial', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
                'theme_config' => ['primary'=>'#2A1A3A','secondary'=>'#B090C8','accent'=>'#D8C0E8','bg'=>'#FAF8FF','text'=>'#1A1228','font_serif'=>'Cormorant Garamond','font_sans'=>'Inter','cover_style'=>'light-overlay','ornament'=>'❁','layout'=>'minimal','particles'=>'petals','particle_color'=>'#D8C0E8'],
            ],
            [
                'name' => 'Rustic', 'slug' => 'rustic',
                'description' => 'Pedesaan yang hangat dengan tekstur kayu dan dedaunan.',
                'category' => 'spesial', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80',
                'theme_config' => ['primary'=>'#4A2800','secondary'=>'#A06030','accent'=>'#D4924A','bg'=>'#FAF4EA','text'=>'#2A1800','font_serif'=>'Playfair Display','font_sans'=>'Lato','cover_style'=>'dark-overlay','ornament'=>'⬡','layout'=>'cultural','particles'=>'leaves','particle_color'=>'#A06030'],
            ],
            [
                'name' => 'Chinese Wedding', 'slug' => 'chinese-wedding',
                'description' => 'Merah emas khas pernikahan Tionghoa yang meriah.',
                'category' => 'spesial', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&q=80',
                'theme_config' => ['primary'=>'#8A0000','secondary'=>'#D4AF7A','accent'=>'#F0C840','bg'=>'#FFF8F0','text'=>'#2A0808','font_serif'=>'Cormorant Garamond','font_sans'=>'Inter','cover_style'=>'dark-overlay','ornament'=>'喜','layout'=>'cultural','particles'=>'glitter','particle_color'=>'#F0C840'],
            ],
            [
                'name' => 'Javanese', 'slug' => 'javanese',
                'description' => 'Motif batik Jawa yang kaya makna dan filosofi.',
                'category' => 'spesial', 'has_photo' => true,
                'preview_image' => 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
                'theme_config' => ['primary'=>'#2A1400','secondary'=>'#8A5020','accent'=>'#C48040','bg'=>'#FAF0E0','text'=>'#1A0A00','font_serif'=>'Cormorant Garamond','font_sans'=>'Inter','cover_style'=>'pattern','ornament'=>'⬟','layout'=>'cultural','particles'=>'glitter','particle_color'=>'#C48040'],
            ],
            [
                'name' => 'Islamic Elegant', 'slug' => 'islamic-elegant',
                'description' => 'Islami syahdu dengan kaligrafi arabik dan hijau zamrud.',
                'category' => 'spesial', 'has_photo' => false,
                'preview_image' => 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?w=800&q=80',
                'theme_config' => ['primary'=>'#0A2A1A','secondary'=>'#2A8A5A','accent'=>'#60C890','bg'=>'#F0FAF5','text'=>'#0A1A12','font_serif'=>'Cormorant Garamond','font_sans'=>'Inter','cover_style'=>'pattern','ornament'=>'☽','layout'=>'islamic','particles'=>'glitter','particle_color'=>'#60C890'],
            ],
            [
                'name' => 'Sundanese', 'slug' => 'sundanese',
                'description' => 'Adat Sunda yang elegan dengan sentuhan hijau dan emas.',
                'category' => 'spesial', 'has_photo' => false,
                'preview_image' => 'https://images.unsplash.com/photo-1535747522408-8a23febc9cc8?w=800&q=80',
                'theme_config' => ['primary'=>'#1A3A1A','secondary'=>'#8A6030','accent'=>'#C4904A','bg'=>'#F8F4E8','text'=>'#0A1A0A','font_serif'=>'Cormorant Garamond','font_sans'=>'Inter','cover_style'=>'pattern','ornament'=>'◈','layout'=>'cultural','particles'=>'leaves','particle_color'=>'#8A6030'],
            ],
            [
                'name' => 'Vintage', 'slug' => 'vintage',
                'description' => 'Klasik vintage seperti foto lama, hangat dan nostalgia.',
                'category' => 'spesial', 'has_photo' => false,
                'preview_image' => 'https://images.unsplash.com/photo-1535747522408-8a23febc9cc8?w=800&q=80',
                'theme_config' => ['primary'=>'#2A1A10','secondary'=>'#8A6040','accent'=>'#C4A070','bg'=>'#FAF4E8','text'=>'#1A100A','font_serif'=>'Playfair Display','font_sans'=>'Lato','cover_style'=>'pattern','ornament'=>'◉','layout'=>'classic','particles'=>'none','particle_color'=>'#C4A070'],
            ],
        ];

        foreach ($templates as $data) {
            Template::updateOrCreate(
                ['slug' => $data['slug']],
                array_merge($data, ['edit_url' => $editUrl, 'is_promo' => true])
            );
        }
    }
}
