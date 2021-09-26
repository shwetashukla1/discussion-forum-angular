import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { CommunityModel } from 'src/app/model/community-model';
import { CommunityService } from 'src/app/services/community.service';

@Component({
  selector: 'app-list-communities',
  templateUrl: './list-communities.component.html',
  styleUrls: ['./list-communities.component.css']
})
export class ListCommunitiesComponent implements OnInit {

  communities: Array<CommunityModel>;

  constructor(private communityService: CommunityService) { }

  ngOnInit(): void {
    this.communityService.getAllCommunities().subscribe(data => {
      this.communities = data;
    }, error => {
      throwError(error);
    })
  }

}
