import { Icons } from '@/components/Icons';
// import { messages } from '@/components/messages';
// import { Utils } from '@/formBuilder/lib/utils';
import { useTranslation } from 'react-i18next';

export default function Menuitem() {
  const { t } = useTranslation();
  // const size = Utils.ScreenSize();

  return {
    agent: [
      {
        path: '/Dashboard',
        icon: <Icons name="Home" size={'mobile'} />,
        iconOver: <Icons name="Home" active={true} size={'mobile'} />,
        primaryName: `داشبورد`,
        badge: false,
      },
      {
        path: '/assessments',
        icon: <Icons name="Test" size={'mobile'} />,
        iconOver: <Icons name="Test" active={true} size={'mobile'} />,
        primaryName: `آزمون ها`,
        badge: false,
      },
      {
        path: '/users',
        icon: <Icons name="Participants" size={'mobile'} />,
        iconOver: <Icons name="Participants" active={true} size={'mobile'} />,
        primaryName: `کاربران`,
        badge: false,
      },
      {
        path: '/groups',
        icon: <Icons name="Group" size={'mobile'} />,
        iconOver: <Icons name="Group" active={true} size={'mobile'} />,
        primaryName: `گروه ها`,
        badge: false,
      },
      // {
      //   path: '/Report',
      //   icon: <Icons name="Report" size={'mobile'} />,
      //   iconOver: <Icons name="Report" active={true} size={'mobile'} />,
      //   primaryName: `${t(messages.Input_ComponentsCommonContainer_Reports())}`,
      //   badge: false,
      // },
      {
        path: '/introduction',
        icon: <Icons name="Blog" size={'mobile'} />,
        iconOver: <Icons name="Blog" active={true} size={'mobile'} />,
        primaryName: `معرفی`,
        badge: false,
      },
      // {
      //   path: '/suggestion',
      //   icon: <Icons name="Suggestion" size={'mobile'} />,
      //   iconOver: <Icons name="Suggestion" active={true} size={'mobile'} />,
      //   primaryName: `${t(messages.Input_ComponentsCommonContainer_Suggestion())}`,
      //   badge: false,
      // },
      // {
      //   path: '/cart',
      //   icon: <Icons name="Basket" size={'mobile'} />,
      //   iconOver: <Icons name="Basket" active={true} size={'mobile'} />,
      //   primaryName: `${t(messages.Input_ComponentsCommonContainer_Cart())}`,
      //   badge: true,
      // },
      {
        path: '/profile',
        icon: <Icons name="User" size={'mobile'} />,
        iconOver: <Icons name="User" active={true} size={'mobile'} />,
        primaryName: `پروفایل`,
        badge: false,
      },
    ],
    scope: [
      {
        path: '/Dashboard',
        icon: <Icons name="Home" size={'mobile'} />,
        iconOver: <Icons name="Home" active={true} size={'mobile'} />,
        primaryName: `داشبورد`,
        badge: false,
      },
      {
        path: '/assessments',
        icon: <Icons name="Test" size={'mobile'} />,
        iconOver: <Icons name="Test" active={true} size={'mobile'} />,
        primaryName: `آزمون ها`,
        badge: false,
      },
      {
        path: '/profile',
        icon: <Icons name="User" size={'mobile'} />,
        iconOver: <Icons name="User" active={true} size={'mobile'} />,
        primaryName: `پروفایل`,
        badge: false,
      },
    ],
    user: [
      {
        path: '/Dashboard',
        icon: <Icons name="Home" size={'mobile'} />,
        iconOver: <Icons name="Home" active={true} size={'mobile'} />,
        primaryName: `داشبورد`,
        badge: false,
      },
      {
        path: '/assessments',
        icon: <Icons name="Test" size={'mobile'} />,
        iconOver: <Icons name="Test" active={true} size={'mobile'} />,
        primaryName: `آزمون ها`,
        badge: false,
      },
      //   {
      //     path: '/introduction',
      //     icon: <Icons name="Blog" size={'mobile'} />,
      //     iconOver: <Icons name="Blog" active={true} size={'mobile'} />,
      //     primaryName: `${t(messages.Input_ComponentsCommonContainer_IntroduceQuestionnaire())}`,
      //     badge: false,
      //   },
      //   {
      //     path: '/cart',
      //     icon: <Icons name="Basket" size={'mobile'} />,
      //     iconOver: <Icons name="Basket" active={true} size={'mobile'} />,
      //     primaryName: `${t(messages.Input_ComponentsCommonContainer_Cart())}`,
      //     badge: true,
      //   },
      //   {
      //     path: '/profile',
      //     icon: <Icons name="User" size={'mobile'} />,
      //     iconOver: <Icons name="User" active={true} size={'mobile'} />,
      //     primaryName: `${t(messages.Input_ComponentsCommonContainer_Account())}`,
      //     badge: false,
      //   },
      // ],
      // admin: [
      //   {
      //     path: '/admin/users',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: `${t(messages.Input_ComponentsCommonContainer_Participants())}`,
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/assessments',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: `${t(messages.Input_ComponentsCommonContainer_Assessments())}`,
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/questionnaires',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: `${t(messages.Input_Global_Questionnaires())}`,
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/owners',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: `${t(messages.Input_ComponentsCommonContainer_Companies())}`,
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/orders',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: `${t(messages.Input_ComponentsCommonContainer_Purchase())}`,
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/logs',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: `${t(messages.Input_ComponentsCommonContainer_Reports())}`,
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/commands',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: `${t(messages.Input_ComponentsCommonContainer_Commands())}`,
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/config',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: `${t(messages.Input_ComponentsCommonContainer_Config())}`,
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/frontversion',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: 'front version',
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/loginactivities',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: 'login activities',
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/setconfig',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: 'set config',
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/updateserver',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: 'update server',
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/updateFront',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: 'update front',
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/notification',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: 'ارسال اعلان',
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/importExcel',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: 'import excel',
      //     badge: false,
      //   },

      //   {
      //     path: '/admin/sendsms',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: 'ارسال پیامک',
      //     badge: false,
      //   },
      //   {
      //     path: '/admin/backup',
      //     icon: <Icons name="Burger-Menu" size={'mobile'} />,
      //     iconOver: <Icons name="Burger-Menu" active={false} size={'mobile'} />,
      //     primaryName: 'پشتیبان گیری',
      //     badge: false,
      //   },
    ],
    admin: [],
  };
}
export { Menuitem as Menus };
