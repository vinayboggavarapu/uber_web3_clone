export const trip = {
  name: 'trips',
  title: 'Trips',
  type: 'document',
  fields: [
    {
      name: 'pickuplocation',
      type: 'string',
      title: 'Pickup location',
    },
    {
      name: 'droplocation',
      type: 'string',
      title: 'Drop location',
    },
    {
      name: 'user',
      type: 'string',
      title: 'User',
    },
    {
      name: 'price',
      type: 'number',
      title: 'price',
    },
    {
      name: 'ridetype',
      type: 'string',
      title: 'RideType',
    },
    {
      name: 'timestamp',
      type: 'datetime',
      title: 'Timestamp',
    },
  ],
}
