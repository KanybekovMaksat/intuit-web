export const pathKeys = {
  root: "/",
  home() {
    return pathKeys.root;
  },
  page404() {
    return pathKeys.root.concat("404/");
  },
  enroll: {
    root() {
      return pathKeys.root.concat("enroll/");
    },
    payments() {
      return pathKeys.enroll.root().concat("payments/");
    },
  },
  tanda() {
    return pathKeys.root.concat("tanda/");
  },
  tandaTest() {
    return pathKeys.root.concat("tanda/test/");
  },
  tandaLogin() {
    return pathKeys.root.concat("tanda/login/");
  },
  tandaResult() {
    return pathKeys.root.concat("tanda/result/");
  },
  schedule: {
    root() {
      return pathKeys.root.concat("schedule/");
    },
    timeTable() {
      return pathKeys.root.concat("time-table/");
    },
    bySlugGroup(id: string | number) {
      return pathKeys.schedule.root().concat(`groups/${id}/`);
    },
    bySlugTeacher(slug: string | number) {
      return pathKeys.schedule.root().concat(`teacher/${slug}/`);
    },
  },
  about: {
    root() {
      return pathKeys.root.concat("about/");
    },
    newsBySlug(params: { slug: string }) {
      return pathKeys.about.root().concat("news/", String(params.slug), "/");
    },
  },
  faculties: {
    root() {
      return pathKeys.root.concat("institutes/");
    },
    bySlug(params: { slug: string }) {
      return pathKeys.faculties.root().concat(String(params.slug), "/");
    },
  },
  degree: {
    root() {
      return pathKeys.root.concat("degree/");
    },
    bySlug(params: { slug: string }) {
      return pathKeys.degree.root().concat(String(params.slug), "/");
    },
  },
  specialization: {
    root() {
      return pathKeys.root.concat("specialization/");
    },
    bySlug(params: { slug: string }) {
      return pathKeys.specialization.root().concat(String(params.slug), "/");
    },
  },
  staff: {
    root() {
      return pathKeys.root.concat("teachers/");
    },
    bySlug(params: { slug: string }) {
      return pathKeys.staff.root().concat(String(params.slug), "/");
    },
  },
  document: {
    root() {
      return pathKeys.root.concat("document/");
    },
    bySlug(params: { slug: string }) {
      return pathKeys.document.root().concat(String(params.slug), "/");
    },
  },
  international: {
    root() {
      return pathKeys.root.concat("international/");
    },
  },
};
