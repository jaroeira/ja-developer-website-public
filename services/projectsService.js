class Project {
  constructor({
    id,
    title,
    description,
    images = [],
    tags = [],
    tools = [],
    projectUrl = '',
    repositoryUrl = '',
    topProject = -1,
    mainFramework = '',
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.images = images;
    this.tags = tags;
    this.tools = tools;
    this.projectUrl = projectUrl;
    this.repositoryUrl = repositoryUrl;
    this.topProject = topProject;
    this.mainFramework = mainFramework;
  }
}

export default ($fire) => {
  const PROJECT_COLLECTION = 'projects';
  const projectRef = $fire.firestore.collection(PROJECT_COLLECTION);

  const projectConverter = {
    toFirestore: (project) => {
      return {
        ...project,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Project({ id: snapshot.id, ...data });
    },
  };

  return {
    add: async (projectData) => {
      const newProject = await projectRef
        .withConverter(projectConverter)
        .add(projectData);
      return newProject;
    },
    get: () => {
      return projectRef
        .withConverter(projectConverter)
        .orderBy('title', 'asc')
        .get()
        .then((querySnapshot) => {
          const results = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            results.push({ ...data });
          });
          return results;
        });
    },
    getTopProjects: () => {
      return projectRef
        .withConverter(projectConverter)
        .where('topProject', '>', -1)
        .limit(3)
        .orderBy('topProject', 'asc')
        .get()
        .then((querySnapshot) => {
          const results = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            results.push({ ...data });
          });
          return results;
        });
    },
    getWithLimit: async ({ limit, lastDocumentId }) => {
      let lastFetchedDocumentRef = null;
      if (lastDocumentId) {
        lastFetchedDocumentRef = await projectRef.doc(lastDocumentId).get();
      }

      return projectRef
        .withConverter(projectConverter)
        .limit(limit)
        .orderBy('title', 'asc')
        .startAfter(lastFetchedDocumentRef)
        .get()
        .then((querySnapshot) => {
          const results = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            results.push({ ...data });
          });
          return results;
        });
    },
    getByTagWithLimit: async ({ limit, lastDocumentId, tag }) => {
      let lastFetchedDocumentRef = null;
      if (lastDocumentId) {
        lastFetchedDocumentRef = await projectRef.doc(lastDocumentId).get();
      }

      return projectRef
        .withConverter(projectConverter)
        .where('tags', 'array-contains', tag)
        .limit(limit)
        .orderBy('title', 'asc')
        .startAfter(lastFetchedDocumentRef)
        .get()
        .then((querySnapshot) => {
          const results = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            results.push({ ...data });
          });
          return results;
        });
    },
    getById: (id) => {
      return projectRef
        .withConverter(projectConverter)
        .doc(id)
        .get()
        .then((doc) => {
          const data = doc.data();
          return data;
        });
    },
    update: (projectId, updateFields) => {
      return projectRef.doc(projectId).update({ ...updateFields });
    },
    updateTopProjects: async (projectIds) => {
      /* projectIds { id: String, topProject: Number } */

      const setTopProjects = $fire.functions.httpsCallable('setTopProjects');
      await setTopProjects({
        projectIds,
      });
    },
    delete: (projectId) => {
      return projectRef.doc(projectId).delete();
    },
  };
};
