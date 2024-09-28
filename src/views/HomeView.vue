<template>
  <div class="max-w-screen-xl m-auto">
    <div class="p-5">
      <!-- <router-link to="/my/list">视频列表</router-link> -->
      <div id="about" class="flex flex-row mt-6">
        <div class="w-2/4">
          <div class="h-full flex flex-col justify-around text-gray-900">
            <h1 class="text-3xl font-medium">
              免费使用<strong>Stylish Reader</strong>更加快速，高效的学习，掌握英语技能。
            </h1>
            <p>
              提供功能齐全的英语学习工具，包括
              <strong>浏览器插件</strong
              >，<strong>APP</strong>，<strong>网站</strong>，彻底摈弃死记硬背的学习模式，通过不断在语境中反复锤炼，让你的英语技能步步高升。
            </p>
            <p>学习英语的唯一捷径就是：不断重复，不断打磨，不断进步！</p>
            <button
              @click="router.push('/center')"
              class="bg-pink-600 px-8 py-3 text-white rounded-md active:shadow-sm active:shadow-pink-800 w-36 hover:animate-none"
            >
              即刻开始
            </button>
          </div>
        </div>
        <div class="w-2/4"><img src="@/assets/images/about-right.webp" alt="" /></div>
      </div>
      <div class="grid grid-cols-3 grid-rows-1 px-8 py-16 bg-slate-50 mt-5">
        <div v-for="data in bannerData" :key="data.iconName">
          <div class="grid grid-cols-2 grid-rows-2 gap-x-6">
            <div class="row-span-2 flex justify-end items-center">
              <div class="w-12 h-12 bg-pink-200 flex justify-center items-center rounded-full">
                <img class="w-6 h-6" :src="data.iconName" alt="" srcset="" />
              </div>
            </div>
            <div class="text-xl font-bold">
              <span>{{ data.topText }}</span>
            </div>
            <div class="text-lg text-gray-700">
              <span>{{ data.bottomText }}</span>
            </div>
          </div>
        </div>
      </div>
      <div id="feature" class="grid grid-rows-1 grid-cols-2 mt-5">
        <div><img src="@/assets/images/features.webp" alt="" /></div>
        <div class="flex justify-end">
          <div class="w-[70%]">
            <h3 class="text-3xl font-medium text-gray-900 leading-relaxed">
              Stylish Reader 提供这些功能
            </h3>
            <p class="my-3">
              通过熟练运用工具中具备的功能，你的英语能力会不断提高，乃至超出你的想象。
            </p>
            <ul class="self-start list-inside flex flex-col gap-1">
              <li>1. 提供划词翻译并收藏单词的浏览器插件。</li>
              <li>2. 收藏YouTube视频到个人中心，同时查看中英双语字幕。</li>
              <li>3. 导出YouTube字幕为pdf格式，并查看收藏单词，短语的统计。</li>
              <li>4. 支持收藏短语及句子。</li>
              <li>5. 支持收藏的单词及短语在APP端进行复习。</li>
            </ul>
            <div>
              使用方法可参考<a class="underline text-pink-600" href="https://doc.stylishreader.com/"
                >此处文档</a
              >。
            </div>
          </div>
        </div>
      </div>
      <div id="pricing" class="flex flex-col">
        <div class="text-center">
          <h3 class="text-2xl text-gray-900 font-medium leading-relaxed">支持与鼓励</h3>
          <p class="text-gray-600">
            Stylish
            Reader的宗旨是帮助更多热爱学习英语的人提供一个学习利器，但由于服务器，数据库的运营都需要十分巨大的经费支撑，故提供了一些增值服务，希望大家多多支持。
          </p>
          <p>🙏🙏🙏</p>

          <button
            @click="sponsorMoney"
            class="my-8 py-2 px-5 border-pink-600 bg-pink-600 text-white cursor-pointer rounded-sm border-2 active:shadow-sm active:shadow-pink-800"
          >
            为服务器加电5毛钱⚡
          </button>
        </div>
        <div class="grid grid-rows-1 grid-cols-3 gap-4">
          <div
            class="rounded-md border-2 border-slate-100 py-10 px-8 flex flex-col justify-start items-center"
          >
            <div>
              <img class="m-auto" src="@/assets/images/plans.webp" alt="" srcset="" />
            </div>
            <div class="mt-3">
              <h3 class="text-gray-900 text-2xl font-bold text-center">免费版</h3>
            </div>
            <div>
              <ul class="text-left mt-8 flex flex-col gap-5 h-[300px]">
                <li class="before:content-['✔️'] before:mr-1">免费使用网站所有内容</li>
                <li class="before:content-['✔️'] before:mr-1">免费使用划词翻译插件</li>
                <li class="before:content-['✔️'] before:mr-1">免费使用单词收藏功能</li>
                <li class="before:content-['✔️'] before:mr-1">免费使用内容批注功能</li>
                <li class="before:content-['✔️'] before:mr-1">免费使用APP复习功能</li>
                <li class="before:content-['✔️'] before:mr-1">免费使用Youtube收藏插件</li>
                <li class="before:content-['✔️'] before:mr-1">中英双语字幕学习收藏视频</li>
              </ul>
            </div>
            <button
              class="py-1 px-5 border-2 border-pink-600 text-pink-600 mt-8"
              @click="sponsorMoney"
            >
              0元开启
            </button>
          </div>
          <div
            class="rounded-md border-2 border-slate-100 py-10 px-8 flex flex-col justify-start items-center"
          >
            <div>
              <img class="m-auto" src="@/assets/images/plans.webp" alt="" srcset="" />
            </div>
            <div class="mt-3">
              <h3 class="text-gray-900 text-2xl font-bold text-center">高级版</h3>
            </div>
            <div>
              <ul class="text-left mt-8 flex flex-col gap-5 h-[300px]">
                <li class="before:content-['✔️'] before:mr-1">免费版所有功能</li>
                <li class="before:content-['⭐'] before:mr-1">科学上网教学</li>
                <li class="before:content-['⭐'] before:mr-1">学习资料推荐</li>
                <li class="before:content-['⭐'] before:mr-1">考研英语备考推荐</li>
                <li class="before:content-['⭐'] before:mr-1">私人定制学习计划</li>
                <li class="before:content-['⭐'] before:mr-1">托福、雅思备考推荐</li>
                <li class="before:content-['⭐'] before:mr-1">导出双语字幕pdf文件</li>
              </ul>
            </div>
            <button
              class="py-1 px-5 border-2 border-pink-600 text-pink-600 mt-8"
              @click="sponsorMoney"
            >
              66元开启
            </button>
          </div>
          <div
            class="rounded-md border-2 border-slate-100 py-10 px-8 flex flex-col justify-start items-center"
          >
            <div>
              <img class="m-auto" src="@/assets/images/plans.webp" alt="" srcset="" />
            </div>
            <div class="mt-3">
              <h3 class="text-gray-900 text-2xl font-bold text-center">终身VIP</h3>
            </div>
            <div>
              <ul class="text-left mt-8 flex flex-col gap-5 h-[300px]">
                <li class="before:content-['✔️'] before:mr-1">高级版所有功能</li>
                <li class="before:content-['⭐⭐'] before:mr-1">定制软件需求</li>
                <li class="before:content-['⭐⭐'] before:mr-1">新功能预先体验</li>
                <li class="before:content-['⭐⭐'] before:mr-1">7x12小时在线支持</li>
              </ul>
            </div>
            <button
              class="py-1 px-5 border-2 border-pink-600 text-pink-600 mt-8"
              @click="sponsorMoney"
            >
              599元开启
            </button>
          </div>
        </div>
      </div>
      <div id="testimonial" class="mt-6">
        <div class="bg-slate-50 py-2">
          <div class="text-2xl text-center flex items-center justify-around">
            <div class="w-60"></div>
            <div class="w-60">联系我吧</div>
            <div class="w-60"></div>
          </div>
          <div container class="flex items-center justify-around mt-10">
            <div item class="flex flex-col items-center cursor-pointer w-60">
              <div class="h-16 w-16 bg-slate-200 rounded-full flex items-center justify-center">
                <img src="@/assets/images/wechat_icon.svg" alt="" srcset="" class="h-10" />
              </div>
              <div class="my-2">微信</div>
              <div>tolyexpert</div>
            </div>
            <div item class="flex flex-col items-center cursor-pointer w-60">
              <div class="h-16 w-16 bg-slate-200 rounded-full flex items-center justify-center">
                <img src="@/assets/images/email_icon.svg" alt="" srcset="" class="h-10" />
              </div>
              <div class="my-2">邮箱</div>
              <div>toly.feng@gmail.com</div>
            </div>
            <div item class="flex flex-col items-center cursor-pointer w-60">
              <div class="h-16 w-16 bg-slate-200 rounded-full flex items-center justify-center">
                <img src="@/assets/images/redbook_icon.svg" alt="" srcset="" class="h-10" />
              </div>
              <div class="my-2">小红书</div>
              <div>
                <a href="https://www.xiaohongshu.com/user/profile/55708c2ca75c956f6a881bc9"
                  >不正经教英语的Toly</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="fixed text-center top-1/4 left-1/4 h-[50%] w-[50%] bg-slate-50 border-slate-300 border-[1px] rounded-md"
    v-if="isSponsorDialogVisible"
  >
    <img class="h-[80%] mx-auto my-auto" src="@/assets/images/sponsor.jpg" alt="" srcset="" />
    <div class="my-auto mt-4"></div>
    <button
      @click="hideSponsorDialog"
      class="bg-pink-600 px-2 py-3 text-white rounded-md active:shadow-sm active:shadow-pink-800 w-32 hover:animate-none"
    >
      关闭
    </button>
    <div class="text-slate-800"><span>付款时请备注</span></div>
  </div>
</template>

<script setup lang="ts">
import articleIcon from '@/assets/images/article.svg';
import userIcon from '@/assets/images/user.svg';
import wordIcon from '@/assets/images/word.svg';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const bannerData = [
  {
    topText: '500+',
    bottomText: '用户学习',
    iconName: userIcon
  },
  {
    topText: '4000+',
    bottomText: '视频和文章',
    iconName: articleIcon
  },
  {
    topText: '20000+',
    bottomText: '单词收藏',
    iconName: wordIcon
  }
];

const isSponsorDialogVisible = ref(false);

onMounted(() => {});

function hideSponsorDialog() {
  isSponsorDialogVisible.value = false;
}

function sponsorMoney() {
  isSponsorDialogVisible.value = true;
}
</script>
