class ApiFeatures {
  public query;
  constructor(query: any) {
    this.query = query;
  }

  pagination = (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    this.query = this.query({skip, take:limit});
    return this;
  };

  search = () =>{
    this.query = this.query.findMany({where:{id: 1}});
    return this;
  }
}

export default ApiFeatures;
