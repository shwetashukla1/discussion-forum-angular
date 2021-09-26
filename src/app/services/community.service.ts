import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunityModel } from '../model/community-model';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private http: HttpClient) { }

  getAllCommunities(): Observable<Array<CommunityModel>>{
    return this.http.get<Array<CommunityModel>>('http://localhost:8080/api/forum');
  }

  createCommunity(communityModel: CommunityModel){
    return this.http.post<CommunityModel>('http://localhost:8080/api/forum', communityModel)
  }
}
