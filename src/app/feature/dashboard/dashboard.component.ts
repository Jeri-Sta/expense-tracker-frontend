import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import 'moment/locale/pt-br';
import { ResumeService } from '../../core/entities/resume/resume.service';
import ResumeDto from '../../core/entities/resume/resume-dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: false,
})
export class DashboardComponent implements OnInit {
  currentDate: Date = new Date();
  resumeData?: ResumeDto;
  selectedOptionTab: string = 'expenses';

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.getResume();
  }

  getResume() {
    this.resumeService
      .getResume(this.currentDate)
      .subscribe((resume: ResumeDto) => {
        this.resumeData = resume;
      });
  }

  formatDate(date: Date): string {
    return moment(date).locale('pt-br').format('MMM/YYYY');
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.getResume();
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.getResume();
  }

  onChangeTab(event: any): void {
    if (this.selectedOptionTab === 'expenses') {
    } else {
    }
  }
}
