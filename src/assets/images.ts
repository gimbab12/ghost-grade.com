// Import all 41 custom gothic and horror fantasy images from ./assets
import female_angel_golden from "./female_angel_golden_1784090996387.jpg";
import female_angel_trumpet_gold from "./female_angel_trumpet_gold_1784154115026.jpg";
import female_asian_ghost from "./female_asian_ghost_1784162538382.jpg";
import female_city_succubus from "./female_city_succubus_1784091084418.jpg";
import female_cyber_vamp from "./female_cyber_vamp_1784091069957.jpg";
import female_ghost_bride from "./female_ghost_bride_1784162939602.jpg";
import female_ghost_brides from "./female_ghost_brides_1784162586528.jpg";
import female_goddess_seashell from "./female_goddess_seashell_1784091056578.jpg";
import female_goth_dagger from "./female_goth_dagger_1784159769878.jpg";
import female_grade_1 from "./female_grade_1_1784009146259.jpg";
import female_grade_2 from "./female_grade_2_1784009183481.jpg";
import female_grade_2_demon_variant_1 from "./female_grade_2_demon_variant_1_1784012556238.jpg";
import female_grade_2_demon_variant_2 from "./female_grade_2_demon_variant_2_1784012572590.jpg";
import female_grade_2_legendary_demon from "./female_grade_2_legendary_demon_1784010592121.jpg";
import female_grade_3 from "./female_grade_3_1784009213788.jpg";
import female_grade_4 from "./female_grade_4_1784009239470.jpg";
import female_greek_fountain from "./female_greek_fountain_1784158316135.jpg";
import female_greek_priestess from "./female_greek_priestess_1784158179530.jpg";
import female_hanbok_flower from "./female_hanbok_flower_1784162742117.jpg";
import female_hunter_deer from "./female_hunter_deer_1784091041486.jpg";
import female_korean_ghost from "./female_korean_ghost_1784162571441.jpg";
import female_kumiho_dagger from "./female_kumiho_dagger_1784162886985.jpg";
import female_kumiho_sword from "./female_kumiho_sword_1784162898772.jpg";
import female_noir_penthouse from "./female_noir_penthouse_1784158193304.jpg";
import female_peacock_blue from "./female_peacock_blue_1784158160927.jpg";
import female_peacock_queen from "./female_peacock_queen_1784091098827.jpg";
import female_qipao_alley from "./female_qipao_alley_1784162553416.jpg";
import female_vamp_balcony_night from "./female_vamp_balcony_night_1784159641091.jpg";
import female_witch_crow from "./female_witch_crow_1784162910593.jpg";
import female_zombie_green_dress from "./female_zombie_green_dress_1784162718076.jpg";
import female_zombie_red_dress from "./female_zombie_red_dress_1784162706638.jpg";
import group_zombies_rooftop from "./group_zombies_rooftop_1784162759873.jpg";
import male_detective_vampire from "./male_detective_vampire_1784163480132.jpg";
import male_grade_1 from "./male_grade_1_1784009131984.jpg";
import male_grade_2 from "./male_grade_2_1784009168870.jpg";
import male_grade_3 from "./male_grade_3_1784009200157.jpg";
import male_grade_4 from "./male_grade_4_1784009224472.jpg";
import male_korean_ghost from "./male_korean_ghost_1784163506201.jpg";
import male_vampire_rooftop from "./male_vampire_rooftop_1784163469143.jpg";
import male_warrior_angel from "./male_warrior_angel_1784091027404.jpg";
import male_zombie_leather from "./male_zombie_leather_1784163493598.jpg";

// Map image arrays by category key "gender_grade"
export const GRADE_IMAGES: Record<string, string[]> = {
  "male_1": [
    male_warrior_angel,
    male_grade_1
  ],
  "female_1": [
    female_angel_golden,
    female_angel_trumpet_gold,
    female_greek_fountain,
    female_greek_priestess,
    female_peacock_blue,
    female_peacock_queen,
    female_goddess_seashell,
    female_grade_1
  ],
  "male_2": [
    male_detective_vampire,
    male_vampire_rooftop,
    male_grade_2
  ],
  "female_2": [
    female_vamp_balcony_night,
    female_witch_crow,
    female_zombie_red_dress, // Note: actually looks like red dress vampire on balcony in user input image 2
    female_goth_dagger,
    female_grade_2_legendary_demon,
    female_grade_2_demon_variant_1,
    female_grade_2_demon_variant_2,
    female_hunter_deer,
    female_noir_penthouse,
    female_grade_2
  ],
  "male_3": [
    male_korean_ghost,
    male_grade_3
  ],
  "female_3": [
    female_hanbok_flower,
    female_korean_ghost,
    female_asian_ghost,
    female_qipao_alley,
    female_ghost_bride,
    female_ghost_brides,
    female_kumiho_dagger,
    female_kumiho_sword,
    female_cyber_vamp,
    female_city_succubus,
    female_grade_3
  ],
  "male_4": [
    male_zombie_leather,
    male_grade_4
  ],
  "female_4": [
    female_zombie_green_dress, // Cracked mirror green dress lady
    group_zombies_rooftop,
    female_grade_4
  ]
};

/**
 * Highly specific keyword matching algorithm to pick the most conceptually matching image
 */
export function getCharacterImage(gender: string, grade: number, characterName: string): string {
  const normalizedGender = gender === "male" ? "male" : "female";
  const key = `${normalizedGender}_${grade}`;
  const candidates = GRADE_IMAGES[key] || GRADE_IMAGES["female_2"];

  // Match keyword based on character name (in Korean/English/Chinese/Japanese)
  const name = characterName.toLowerCase();

  if (normalizedGender === "male") {
    if (grade === 1) {
      if (name.includes("천사") || name.includes("angel") || name.includes("루시퍼") || name.includes("lucifer")) {
        return male_warrior_angel;
      }
      return male_grade_1;
    } else if (grade === 2) {
      if (name.includes("탐정") || name.includes("detective") || name.includes("수사") || name.includes("신사")) {
        return male_detective_vampire;
      }
      if (name.includes("뱀파이어") || name.includes("vampire") || name.includes("백작") || name.includes("드라큘라") || name.includes("달") || name.includes("옥상")) {
        return male_vampire_rooftop;
      }
      return male_grade_2;
    } else if (grade === 3) {
      if (name.includes("귀신") || name.includes("ghost") || name.includes("한복") || name.includes("도령") || name.includes("동자") || name.includes("조선")) {
        return male_korean_ghost;
      }
      return male_grade_3;
    } else {
      if (name.includes("좀비") || name.includes("zombie") || name.includes("가죽") || name.includes("leather")) {
        return male_zombie_leather;
      }
      return male_grade_4;
    }
  } else {
    // Female
    if (grade === 1) {
      if (name.includes("나팔") || name.includes("trumpet") || name.includes("악기") || name.includes("연주")) {
        return female_angel_trumpet_gold;
      }
      if (name.includes("천사") || name.includes("angel") || name.includes("성스") || name.includes("수호")) {
        return female_angel_golden;
      }
      if (name.includes("그리스") || name.includes("greek") || name.includes("사제") || name.includes("priestess")) {
        return female_greek_priestess;
      }
      if (name.includes("분수") || name.includes("fountain") || name.includes("여신") || name.includes("goddess")) {
        return female_greek_fountain;
      }
      if (name.includes("공작") || name.includes("peacock") || name.includes("여왕") || name.includes("queen")) {
        return name.includes("블루") || name.includes("blue") ? female_peacock_blue : female_peacock_queen;
      }
      if (name.includes("조개") || name.includes("seashell") || name.includes("바다") || name.includes("sea")) {
        return female_goddess_seashell;
      }
      return female_grade_1;
    } else if (grade === 2) {
      if (name.includes("마녀") || name.includes("witch") || name.includes("까마귀") || name.includes("crow") || name.includes("물약")) {
        return female_witch_crow;
      }
      if (name.includes("빨간") || name.includes("red") || name.includes("드레스") || name.includes("dress") || name.includes("붉은")) {
        return female_zombie_red_dress;
      }
      if (name.includes("옥상") || name.includes("rooftop") || name.includes("그룹") || name.includes("동료") || name.includes("친구") || name.includes("파티")) {
        return group_zombies_rooftop;
      }
      if (name.includes("발코니") || name.includes("balcony") || name.includes("뱀파이어") || name.includes("vampire")) {
        return female_vamp_balcony_night;
      }
      if (name.includes("단검") || name.includes("dagger") || name.includes("고스") || name.includes("goth")) {
        return female_goth_dagger;
      }
      if (name.includes("펜트하우스") || name.includes("penthouse") || name.includes("느와르") || name.includes("noir")) {
        return female_noir_penthouse;
      }
      if (name.includes("사냥꾼") || name.includes("hunter") || name.includes("사슴") || name.includes("deer")) {
        return female_hunter_deer;
      }
      if (name.includes("레전더리") || name.includes("legendary") || name.includes("악마") || name.includes("demon")) {
        return female_grade_2_legendary_demon;
      }
      return female_grade_2;
    } else if (grade === 3) {
      if (name.includes("한복") || name.includes("flower") || name.includes("꽃")) {
        return female_hanbok_flower;
      }
      if (name.includes("구미호") || name.includes("kumiho") || name.includes("꼬리") || name.includes("검") || name.includes("sword")) {
        return name.includes("검") || name.includes("sword") ? female_kumiho_sword : female_kumiho_dagger;
      }
      if (name.includes("아시아") || name.includes("asian") || name.includes("중국") || name.includes("치파오") || name.includes("qipao")) {
        return name.includes("골목") || name.includes("alley") || name.includes("치파오") ? female_qipao_alley : female_asian_ghost;
      }
      if (name.includes("신부") || name.includes("bride") || name.includes("웨딩") || name.includes("wedding")) {
        return name.includes("들") || name.includes("s") || name.includes("복수") ? female_ghost_brides : female_ghost_bride;
      }
      if (name.includes("한국") || name.includes("korean") || name.includes("처녀")) {
        return female_korean_ghost;
      }
      if (name.includes("사이버") || name.includes("cyber")) {
        return female_cyber_vamp;
      }
      if (name.includes("서큐버스") || name.includes("succubus") || name.includes("유혹")) {
        return female_city_succubus;
      }
      return female_grade_3;
    } else {
      // Grade 4
      if (name.includes("거울") || name.includes("mirror") || name.includes("초록") || name.includes("green")) {
        return female_zombie_green_dress;
      }
      if (name.includes("옥상") || name.includes("rooftop") || name.includes("좀비") || name.includes("zombies")) {
        return group_zombies_rooftop;
      }
      return female_grade_4;
    }
  }

  // Fallback to random if no keyword matched, but keep it in range
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}
