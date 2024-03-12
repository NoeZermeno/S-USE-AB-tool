import Vue from "vue";
import Router from "vue-router";

const LoginView = () => import("@/components/login.view.vue");
const RegisterUser = () => import("@/components/registerUser.vue")
const HomeView = () => import("@/components/main/home.view.vue")
const ProjectView = () => import("@/components/projects/projectsTabs.vue")
const WizardView = () => import("@/components/projects/wizard.view.vue")
const UsersView = () => import("@/components/users/users.view.vue")
const RolesView = () => import("@/components/roles/roles.view.vue")
const ReportsView = () => import("@/components/reports/reports.view.vue")
const TestView = () => import("@/components/test/tests.view.vue")
const AllQuizView = () => import("@/components/projects/allQuiz.view.vue")
Vue.use(Router);

export default new Router({
  mode: "history",
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: [

    { path: '/', redirect: '/login'},
    { path: '/login', name: 'login', component: LoginView },
    { path: '/sign-up',name: 'signUp',component: RegisterUser },
    {
      path: '/home', name:'home', component: HomeView,
      children:[
        { path: '/projects',name: 'projects',component: ProjectView },
        { path: '/project/:id/wizard', name:'wizard',  component:WizardView },
        { path: '/users',name: 'users', component: UsersView },
        { path: '/roles',name: 'roles', component: RolesView },
        { path: '/reports',name: 'reports', component: ReportsView },
        { path: '/test', name:'tests', component: TestView },
        { path: '/project/:id/quizzes', name:'allQuiz',  component:AllQuizView },
      ]
    },
    {
      //Cualquier ruta que no exista, se redireccionará al home
      path: '*',
      redirect: '/home',
  }
  ],
});
