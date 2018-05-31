import { Request } from 'express';
import { GraphQLObjectType, GraphQLInputObjectType, GraphQLFieldConfigMap, GraphQLInputFieldConfigMap, GraphQLID, GraphQLString } from 'graphql';
import { ArtistModel } from '../artist/model';
import { artistType } from '../artist/type';
import { showcaseType } from '../showcase/type';
import { ShowcaseModel } from '../showcase/model';
import { Timeslot } from '../../entity/timeslot';

const baseTimeslotFields: GraphQLFieldConfigMap<Timeslot, Request> & GraphQLInputFieldConfigMap = {
  time: {
    type: GraphQLString
  },
};

export const timeslotType = new GraphQLObjectType({
  name: 'Timeslot',
  description: 'Showcase Timeslot',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    ...baseTimeslotFields,
    artist: {
      type: artistType,
      resolve: (source) => new ArtistModel().getArtistByTimeslotId(source.id)
    },
    showcase: {
      type: showcaseType,
      resolve: (source) => new ShowcaseModel().getShowcaseByTimeslotId(source.id)
    }
  })
});

export const timeslotUpdateType = new GraphQLInputObjectType({
  name: 'TimeslotUpdate',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    ...baseTimeslotFields
  })
});
