// src/services/course/ICourseService.ts
import { PaginationResult, PaginationOptions } from '../../types/pagination';

export interface CourseCreateData {
  title: string;
  description?: string;
  difficultyLevel: string;
  isPremium?: boolean;
  price?: number;
  isApproved: boolean;
  artistId: number;
  categoryId?: number;
  coverImage?: string;
}

export interface CourseUpdateData {
  title?: string;
  description?: string;
  difficultyLevel?: string;
  isPremium?: boolean;
  price?: number;
  isApproved?: boolean;
  categoryId?: number;
  coverImage?: string;
}

export interface CourseAudioAddOptions {
  position?: number;
  sectionTitle?: string;
}

export interface ICourseService {
  getAllCourses(options: PaginationOptions, filters?: any): Promise<PaginationResult<any>>;
  getCourseById(courseId: number): Promise<any>;
  getCoursesByArtistId(artistId: number, options: PaginationOptions): Promise<PaginationResult<any>>;
  getCoursesByCategoryId(categoryId: number, options: PaginationOptions): Promise<PaginationResult<any>>;
  createCourse(courseData: CourseCreateData): Promise<any>;
  updateCourse(courseId: number, updateData: CourseUpdateData): Promise<any>;
  deleteCourse(courseId: number): Promise<boolean>;
  addAudioToCourse(courseId: number, audioId: number, options?: CourseAudioAddOptions): Promise<any>;
  removeAudioFromCourse(courseId: number, audioId: number): Promise<boolean>;
  reorderCourseAudio(courseId: number, audioId: number, newPosition: number, sectionTitle?: string): Promise<boolean>;
}