import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLFieldConfig,
} from 'graphql';
import { ShowcaseModel } from '../showcase/model';
import { showcaseType, showcaseInputType, showcaseUpdateType } from '../showcase/type';

export namespace query {
  export const showcases = {
    type: new GraphQLList(showcaseType),
    resolve: () => new ShowcaseModel().getShowcases()
  };
  export const showcase = {
    type: showcaseType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: (_, args) => new ShowcaseModel().getShowcaseById(args.id)
  };
}

export namespace mutation {
  export const createShowcase: GraphQLFieldConfig<{}, {}> = {
    type: showcaseType,
    args: {
      showcase: {
        type: new GraphQLNonNull(showcaseInputType)
      }
    },
    resolve: (_, args) => new ShowcaseModel().createShowcase(args.showcase)
  };

  export const updateShowcase: GraphQLFieldConfig<{}, {}> = {
    type: showcaseType,
    args: {
      showcase: {
        type: new GraphQLNonNull(showcaseUpdateType)
      }
    },
    resolve: (_, args) => new ShowcaseModel().createShowcase(args.showcase)
  };
}
